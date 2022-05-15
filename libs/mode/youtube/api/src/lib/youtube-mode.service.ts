import { PrismaService } from '@dream/prisma/mono';
import { YoutubeService } from '@dream/external-api/youtube';
import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Injectable()
export class WaitlistYoutubeService {
  private readonly logger = new Logger(WaitlistYoutubeService.name);

  constructor(
    private prisma: PrismaService,
    private youtube: YoutubeService,
    @InjectQueue('waitlistYoutube')
    private readonly waitlistYoutubeQueue: Queue,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  async init(channelId: string) {
    const waitlistYoutube = await this.prisma.youtubeMode.findFirst({
      where: { channelId },
    });

    if (waitlistYoutube) return waitlistYoutube;

    return this.prisma.youtubeMode.create({
      data: {
        channel: { connect: { id: channelId } },
      },
    });
  }

  async updateWaitlistState({ waitlistId, itemId = null, duration = 0 }) {
    this.logger.log(
      `Update waitlist state waitlist:${waitlistId}, item:${itemId}`
    );

    const waitlistYoutubeUpdated = await this.prisma.youtubeMode.update({
      where: { id: waitlistId },
      data: { itemId },
    });

    if (itemId) {
      // Create new skip process
      this.logger.log(`Create new skip process waitlist:${itemId}`);
      this.waitlistYoutubeQueue.add(
        `skip`,
        { itemId },
        { delay: duration, removeOnComplete: true }
      );
    }

    this.logger.log(
      `waitlistYoutubeCurrentUpdated - ${waitlistYoutubeUpdated.channelId}`
    );

    this.pubsub.publish('waitlistYoutubeCurrentUpdated', {
      channelId: waitlistYoutubeUpdated.channelId,
      waitlistYoutubeCurrentUpdated: true,
    });
  }

  async setVideo({ channelId, manualSkip = false }) {
    this.logger.log(`setVideo channel:${channelId}`);

    // Get current state
    const waitlistYoutube = await this.prisma.youtubeMode.findFirst({
      where: { channelId },
    });

    if (waitlistYoutube?.itemId) {
      // Update current item data
      await this.prisma.youtubeModeItem.update({
        where: { id: waitlistYoutube?.itemId },
        data: { endedAt: new Date(), skipped: manualSkip },
      });
    }

    // Cut first video from queue
    const item = await this.prisma.youtubeModeItem.findFirst({
      where: {
        channelId,
        startedAt: null,
        canceled: false,
      },
      include: { video: true },
      orderBy: { createdAt: 'asc' },
    });

    if (!item) {
      this.logger.log('Queue is empty');
      // Clear state
      return this.updateWaitlistState({ waitlistId: waitlistYoutube?.id });
    }

    const itemId = item.id;

    const updatedItem = await this.prisma.youtubeModeItem.update({
      where: { id: itemId },
      data: { startedAt: new Date() },
    });

    this.pubsub.publish('waitlistYoutubeQueueUpdated', {
      channelId: updatedItem.channelId,
      waitlistYoutubeQueueUpdated: true,
    });

    this.pubsub.publish('waitlistYoutubeHistoryUpdated', {
      channelId: updatedItem.channelId,
      waitlistYoutubeHistoryUpdated: true,
    });

    return this.updateWaitlistState({
      waitlistId: waitlistYoutube?.id,
      itemId,
      duration: item?.duration,
    });
  }

  async addVideo({
    channelId,
    videoId,
    userId,
  }: {
    channelId: string;
    videoId: string;
    userId: string;
  }) {
    this.logger.log('Add Video');

    const video = await this.youtube.getVideo(videoId);

    this.logger.log(video);

    if (!video) {
      throw 'Video not found';
    }

    // Set track to video
    const newItem = await this.prisma.youtubeModeItem.create({
      data: {
        duration: video?.duration_ms, // TODO: Include start, end position
        end: video?.duration_ms,
        channel: {
          connect: { id: channelId },
        },
        author: {
          connect: { id: userId },
        },
        video: {
          connectOrCreate: {
            where: { id: videoId },
            create: {
              id: videoId,
              title: video?.title,
              cover: video?.cover,
              duration: video?.duration_ms,
            },
          },
        },
      },
    });

    this.pubsub.publish('waitlistYoutubeQueueUpdated', {
      channelId: newItem.channelId,
      waitlistYoutubeQueueUpdated: true,
    });

    const waitlistYoutubeIsEmpty = await this.prisma.youtubeMode.findFirst({
      where: { channelId, itemId: null },
    });

    if (waitlistYoutubeIsEmpty) {
      return this.setVideo({ channelId });
    }
  }

  removeVideo() {
    this.logger.log('removeTrack');
    // Remove track from queue

    // this.pubsub.publish('waitlistYoutubeQueueUpdated', {
    //   channelName: waitlistYoutubeUpdated.channel.name,
    // });
  }

  async skipVideoByQueue(itemId: string) {
    this.logger.log('skipTrackByQueue', itemId);

    if (!itemId) {
      return null;
    }

    const waitlistYoutube = await this.prisma.youtubeMode.findFirst({
      where: { itemId },
    });

    if (waitlistYoutube) {
      return this.setVideo({ channelId: waitlistYoutube.channelId });
    }
  }

  async skipVideo({ channelId }) {
    this.logger.log('skipVideo', channelId);
    // Set next video from queue
    return this.setVideo({ channelId, manualSkip: true });
  }
}
