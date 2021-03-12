import { PrismaService } from '@dream/prisma';
import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Injectable()
export class ModeWaitlistService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue('modeWaitlist') private readonly modeWaitlistQueue: Queue,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  async setTrack({ channelId }) {
    Logger.log('setTrack');
    // Cut first track from queue
    const track = await this.prisma.modeWaitlistQueue.findFirst({
      where: {
        channelId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (!track) {
      Logger.log('Mode Waitlist Queue is empty');
      return;
    }

    // await this.prisma.modeWaitlistQueue.delete({ where: { id: track.id } });

    const modeWaitlist = await this.prisma.modeWaitlist.findFirst({
      where: { channelId: track.channelId },
    });

    await this.prisma.modeWaitlistQueue.delete({ where: { id: track.id } });
    await this.prisma.modeWaitlistQueue.create({
      data: {
        trackId: modeWaitlist.trackId,
        title: modeWaitlist.title,
        artists: modeWaitlist.artists,
        cover: modeWaitlist.cover,
        duration: modeWaitlist.duration,
        channelId: modeWaitlist.channelId,
        authorId: modeWaitlist.authorId,
      },
    });

    const start = new Date();
    const playkey = modeWaitlist.id + +start;

    // Set this track to waitlistMode state
    const modeWaitlistUpdated = await this.prisma.modeWaitlist.update({
      where: {
        id: modeWaitlist.id,
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
    });

    // Create new skip process
    this.modeWaitlistQueue.add(
      `modeWaitlistSkip`,
      { playkey },
      { delay: track.duration, removeOnComplete: true }
    );

    this.pubsub.publish('modeWaitlistUpdated', {
      modeWaitlistUpdated: {
        ...modeWaitlistUpdated,
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

    const modeWaitlist = await this.prisma.modeWaitlist.findFirst({
      where: {
        playkey,
      },
    });

    if (modeWaitlist) {
      return this.setTrack({ channelId: modeWaitlist.channelId });
    }
  }

  async skipTrack({ channelId }) {
    Logger.log('skipTrack', channelId);
    // Cancel current skip process
    // await this.prisma.modeWaitlist.de;
    // this.modeWaitlistQueue.removeJobs(`modeWaitlistSkip`);
    // this.modeWaitlistQueue.getJobs()
    // Set next track from queue
    return this.setTrack({ channelId });
  }
}
