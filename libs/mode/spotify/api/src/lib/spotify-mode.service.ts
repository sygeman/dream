import { PrismaService } from '@dream/prisma';
import { SpotifyService } from '@dream/external-api/spotify';
import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Injectable()
export class SpotifyModeService {
  private readonly logger = new Logger(SpotifyModeService.name);

  constructor(
    private prisma: PrismaService,
    private spotify: SpotifyService,
    @InjectQueue('spotifyMode')
    private readonly spotifyModeQueue: Queue,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  async init(channelId: string) {
    const spotifyMode = await this.prisma.spotifyMode.findFirst({
      where: { channelId },
    });

    if (spotifyMode) return spotifyMode;

    return this.prisma.spotifyMode.create({
      data: {
        channel: { connect: { id: channelId } },
      },
    });
  }

  async updateWaitlistState({ waitlistId, itemId = null, duration = 0 }) {
    this.logger.log(
      `Update waitlist state waitlist:${waitlistId}, item:${itemId}`
    );

    const spotifyModeUpdated = await this.prisma.spotifyMode.update({
      where: { id: waitlistId },
      data: { itemId },
    });

    if (itemId) {
      // Create new skip process
      this.logger.log(`Create new skip process waitlist:${itemId}`);
      this.spotifyModeQueue.add(
        `skip`,
        { itemId },
        { delay: duration, removeOnComplete: true }
      );
    }

    this.logger.log(
      `spotifyModeCurrentUpdated - ${spotifyModeUpdated.channelId}`
    );

    this.pubsub.publish('spotifyModeCurrentUpdated', {
      channelId: spotifyModeUpdated.channelId,
      spotifyModeCurrentUpdated: true,
    });
  }

  async setTrack({ channelId, manualSkip = false }) {
    this.logger.log(`setTrack channel:${channelId}`);

    // Get current state
    const spotifyMode = await this.prisma.spotifyMode.findFirst({
      where: { channelId },
    });

    if (spotifyMode?.itemId) {
      // Update current item data
      await this.prisma.spotifyModeItem.update({
        where: { id: spotifyMode?.itemId },
        data: { endedAt: new Date(), skipped: manualSkip },
      });
    }

    // Cut first track from queue
    const item = await this.prisma.spotifyModeItem.findFirst({
      where: {
        channelId,
        startedAt: null,
        canceled: false,
      },
      include: { track: true },
      orderBy: { createdAt: 'asc' },
    });

    if (!item) {
      this.logger.log('Queue is empty');
      // Clear state
      return this.updateWaitlistState({ waitlistId: spotifyMode?.id });
    }

    const itemId = item.id;

    const updatedItem = await this.prisma.spotifyModeItem.update({
      where: { id: itemId },
      data: { startedAt: new Date() },
    });

    this.pubsub.publish('spotifyModeQueueUpdated', {
      channelId: updatedItem.channelId,
      spotifyModeQueueUpdated: true,
    });

    this.pubsub.publish('spotifyModeHistoryUpdated', {
      channelId: updatedItem.channelId,
      spotifyModeHistoryUpdated: true,
    });

    return this.updateWaitlistState({
      waitlistId: spotifyMode?.id,
      itemId,
      duration: item?.duration,
    });
  }

  async addTrack({
    channelId,
    trackId,
    userId,
  }: {
    channelId: string;
    trackId: string;
    userId: string;
  }) {
    this.logger.log('addTrack');

    const track = (await this.spotify.getTrack(trackId, userId))?.data;

    if (!track) {
      throw 'Track not found';
    }

    // Set track to queue
    const images = track?.album?.images || [];

    const newItem = await this.prisma.spotifyModeItem.create({
      data: {
        duration: track?.duration_ms, // TODO: Include start, end position
        end: track?.duration_ms,
        channel: {
          connect: { id: channelId },
        },
        author: {
          connect: { id: userId },
        },
        track: {
          connectOrCreate: {
            where: { id: trackId },
            create: {
              id: trackId,
              title: track?.name,
              artists: (track?.artists || [])
                .map((artist) => artist?.name)
                .join(', '),
              cover: images[images.length - 1]?.url,
              duration: track?.duration_ms,
            },
          },
        },
      },
    });

    this.pubsub.publish('spotifyModeQueueUpdated', {
      channelId: newItem.channelId,
      spotifyModeQueueUpdated: true,
    });

    const spotifyModeIsEmpty = await this.prisma.spotifyMode.findFirst({
      where: { channelId, itemId: null },
    });

    if (spotifyModeIsEmpty) {
      return this.setTrack({ channelId });
    }
  }

  removeTrack() {
    this.logger.log('removeTrack');
    // Remove track from queue

    // this.pubsub.publish('spotifyModeQueueUpdated', {
    //   channelName: spotifyModeUpdated.channel.name,
    // });
  }

  async skipTrackByQueue(itemId: string) {
    this.logger.log('skipTrackByQueue', itemId);

    if (!itemId) {
      return null;
    }

    const spotifyMode = await this.prisma.spotifyMode.findFirst({
      where: { itemId },
    });

    if (spotifyMode) {
      return this.setTrack({ channelId: spotifyMode.channelId });
    }
  }

  async skipTrack({ channelId }) {
    this.logger.log('skipTrack', channelId);
    // Set next track from queue
    return this.setTrack({ channelId, manualSkip: true });
  }

  async syncUserSpotify({ channelId, userId }) {
    const spotifyMode = await this.prisma.spotifyMode.findFirst({
      where: { channelId },
      include: { item: { include: { track: true } } },
    });

    const trackId = spotifyMode?.item?.trackId;

    if (!trackId) {
      try {
        return await this.spotify.pause(userId);
      } catch (error) {
        // this.logger.error(error);
      }
    }

    const s = +new Date(+spotifyMode?.item?.startedAt);
    const now = +new Date();
    const position = now - s;

    this.logger.log(
      `Sync user spotify channel:${channelId} user:${userId} track:${trackId} start:${position}`
    );

    try {
      await this.spotify.setTrack(trackId, userId, position);
    } catch (error) {
      this.logger.log(error);
    }
  }
}
