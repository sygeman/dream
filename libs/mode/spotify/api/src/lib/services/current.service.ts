import { SpotifyService } from '@dream/external-api/spotify';
import { PrismaService } from '@dream/prisma/mono';
import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { RedisPubSub } from 'graphql-redis-subscriptions';

function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

@Injectable()
export class SpotifyModeCurrentService {
  private readonly logger = new Logger(SpotifyModeCurrentService.name);

  constructor(
    private spotify: SpotifyService,
    private prisma: PrismaService,
    @InjectQueue('spotifyMode')
    private readonly spotifyModeQueue: Queue,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  async updateCurrentItem(id: string, itemId: string = null) {
    await this.prisma.spotifyMode.update({ where: { id }, data: { itemId } });
    return this.spotifyModeQueue.add('currentUpdated', { id });
  }

  async moveItemFromCurrentToHistory(id: string, skipped = false) {
    const updatedItem = await this.prisma.spotifyModeItem.update({
      where: { id },
      data: { endedAt: new Date(), skipped },
    });

    this.pubsub.publish('spotifyModeHistoryUpdated', {
      channelId: updatedItem.channelId,
      spotifyModeHistoryUpdated: true,
    });
  }

  async moveItemFromQueueToCurrent(id: string) {
    const updatedItem = await this.prisma.spotifyModeItem.update({
      where: { id },
      data: { startedAt: new Date() },
    });

    this.pubsub.publish('spotifyModeQueueUpdated', {
      channelId: updatedItem.channelId,
      spotifyModeQueueUpdated: true,
    });
  }

  async getFirstItemFromQueue(channelId: string) {
    return this.prisma.spotifyModeItem.findFirst({
      where: {
        channelId,
        startedAt: null,
        canceled: false,
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async getRandomTrackFromHistory(channelId: string) {
    const historyItemsCount = await this.prisma.spotifyModeItem.count({
      where: { channel: { id: channelId }, endedAt: { not: null } },
      orderBy: { createdAt: 'desc' },
    });

    const skip = between(0, historyItemsCount);

    const historyItem = await this.prisma.spotifyModeItem.findFirst({
      where: { channel: { id: channelId }, endedAt: { not: null } },
      orderBy: { createdAt: 'desc' },
      skip,
    });

    return historyItem;
  }

  async set({ channelId, manualSkip = false }) {
    const spotifyMode = await this.prisma.spotifyMode.findFirst({
      where: { channelId },
    });

    if (spotifyMode?.itemId) {
      this.moveItemFromCurrentToHistory(spotifyMode?.itemId, manualSkip);
    }

    const firstItemFromQueue = await this.getFirstItemFromQueue(channelId);

    if (!firstItemFromQueue) {
      await this.updateCurrentItem(spotifyMode?.id);
      const endlessMode = true;

      if (endlessMode) {
        const trackFromHistory = await this.getRandomTrackFromHistory(
          channelId
        );

        return this.add({
          channelId,
          trackId: trackFromHistory.trackId,
          userId: trackFromHistory.authorId,
        });
      } else {
        return;
      }
    }

    this.moveItemFromQueueToCurrent(firstItemFromQueue.id);

    return this.updateCurrentItem(spotifyMode?.id, firstItemFromQueue.id);
  }

  async skipByQueue(itemId: string) {
    if (!itemId) return null;

    const spotifyMode = await this.prisma.spotifyMode.findFirst({
      where: { itemId },
    });

    if (spotifyMode) return this.set({ channelId: spotifyMode.channelId });
  }

  async skip({ channelId }) {
    return this.set({ channelId, manualSkip: true });
  }

  async add({
    channelId,
    trackId,
    userId,
    start = 0,
    end,
  }: {
    channelId: string;
    trackId: string;
    userId: string;
    start?: number;
    end?: number;
  }) {
    this.logger.log('addTrackToQueue');
    const track = await this.spotify.getFormatedTrack(trackId, userId);

    if (typeof end !== 'number') end = track.duration;

    const newItem = await this.prisma.spotifyModeItem.create({
      data: {
        duration: end - start,
        start,
        end,
        channel: {
          connect: { id: channelId },
        },
        author: {
          connect: { id: userId },
        },
        track: {
          connect: { id: track.id },
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
      return this.set({ channelId });
    }
  }

  remove() {
    this.logger.log('removeTrack');
    // Remove track from queue

    // this.pubsub.publish('spotifyModeQueueUpdated', {
    //   channelName: spotifyModeUpdated.channel.name,
    // });
  }
}
