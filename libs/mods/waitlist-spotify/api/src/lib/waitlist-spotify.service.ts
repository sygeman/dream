import { PrismaService } from '@dream/prisma';
import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Injectable()
export class WaitlistSpotifyService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue('waitlistSpotify')
    private readonly waitlistSpotifyQueue: Queue,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  async setTrack({ channelId }) {
    Logger.log('setTrack');
    // Cut first track from queue
    const track = await this.prisma.modeWaitlistSpotify.findFirst({
      where: { channelId },
      orderBy: { createdAt: 'asc' },
    });

    if (!track) {
      Logger.log('waitlistSpotifyQueue is empty');
      return;
    }

    const waitlistSpotify = await this.prisma.modeWaitlistSpotify.findFirst({
      where: { channelId: track.channelId },
    });

    await this.prisma.modeWaitlistSpotifyQueue.delete({
      where: { id: track.id },
    });
    await this.prisma.modeWaitlistSpotifyQueue.create({
      data: {
        trackId: waitlistSpotify.trackId,
        title: waitlistSpotify.title,
        artists: waitlistSpotify.artists,
        cover: waitlistSpotify.cover,
        duration: waitlistSpotify.duration,
        channelId: waitlistSpotify.channelId,
        authorId: waitlistSpotify.authorId,
      },
    });

    const start = new Date();
    const playkey = waitlistSpotify.id + +start;

    // Set this track to waitlistMode state
    const waitlistSpotifyUpdated = await this.prisma.modeWaitlistSpotify.update(
      {
        where: {
          id: waitlistSpotify.id,
        },
        data: {
          trackId: track.trackId,
          title: track.title,
          artists: track.artists,
          cover: track.cover,
          duration: track.duration,
          channelId: track.channelId,
          authorId: track.authorId,
          start,
          playkey,
        },
      }
    );

    // Create new skip process
    this.waitlistSpotifyQueue.add(
      `skip`,
      { playkey },
      { delay: track.duration, removeOnComplete: true }
    );

    this.pubsub.publish('waitlistSpotifyUpdated', {
      waitlistSpotifyUpdated: {
        ...waitlistSpotifyUpdated,
        start: `${start.getTime()}`,
      },
    });
  }

  addTrack() {
    Logger.log('addTrack');
    // Add track to queue
    // If current is empty this.setTrack()
  }

  removeTrack() {
    Logger.log('removeTrack');
    // Remove track from queue
  }

  async skipTrackByQueue(playkey: string) {
    Logger.log('skipTrackByQueue', playkey);

    const waitlistSpotify = await this.prisma.modeWaitlistSpotify.findFirst({
      where: {
        playkey,
      },
    });

    if (waitlistSpotify) {
      return this.setTrack({ channelId: waitlistSpotify.channelId });
    }
  }

  async skipTrack({ channelId }) {
    Logger.log('skipTrack', channelId);
    // Set next track from queue
    return this.setTrack({ channelId });
  }
}
