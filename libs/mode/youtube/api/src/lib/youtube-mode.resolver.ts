import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PrismaService } from '@dream/prisma/mono';
import { Inject, UseGuards } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { AuthGuard } from '@dream/auth-api';
import { WaitlistYoutubeService } from './youtube-mode.service';
import { YoutubeModeQueueAction } from './models/queue/action';
import { YoutubeModeHistoryItemAction } from './models/history/item-action';
import { YoutubeModeQueueItemAction } from './models/queue/item-action';
import { YoutubeModeCurrentAction } from './models/current/action';
import { YoutubeModeHistory } from './models/history/model';
import { YoutubeModeCurrent } from './models/current/model';
import { YoutubeModeQueue } from './models/queue/model';
import { ChannelMode } from '@prisma/mono';

@Resolver()
export class WaitlistYoutubeResolver {
  constructor(
    private prisma: PrismaService,
    private waitlistYoutubeService: WaitlistYoutubeService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  @Query(() => YoutubeModeHistory)
  async waitlistYoutubeHistory(@Args({ name: 'channelId' }) channelId: string) {
    const historyItems = await this.prisma.youtubeModeItem.findMany({
      where: { channel: { id: channelId }, endedAt: { not: null } },
      orderBy: {
        createdAt: 'desc',
      },
      include: { video: true, author: true },
      take: 15,
    });

    const history = {
      items: historyItems.reverse().map((item) => ({
        data: {
          ...item,
          cover: item.video.cover,
          title: item.video.title,
        },
        actions: [YoutubeModeHistoryItemAction.ADD_TO_QUEUE],
      })),
    };

    return history;
  }

  @Query(() => YoutubeModeCurrent, { nullable: true })
  async waitlistYoutubeCurrent(@Args({ name: 'channelId' }) channelId: string) {
    const modeData = await this.prisma.youtubeMode.findFirst({
      where: { channel: { id: channelId } },
      include: {
        item: { include: { video: true, author: true } },
      },
    });

    if (!modeData?.item) {
      return null;
    }

    const current = {
      item: {
        ...modeData.item,
        cover: modeData.item.video.cover,
        title: modeData.item.video.title,
      },
      actions: [YoutubeModeCurrentAction.SKIP],
    };

    return current;
  }

  @Query(() => YoutubeModeQueue)
  async waitlistYoutubeQueue(@Args({ name: 'channelId' }) channelId: string) {
    const queueItems = await this.prisma.youtubeModeItem.findMany({
      where: {
        channel: { id: channelId },
        startedAt: null,
        canceled: false,
      },
      include: { video: true, author: true },
      take: 15,
    });

    const queue = {
      actions: [YoutubeModeQueueAction.ADD_VIDEO],
      items: queueItems.map((item) => ({
        data: {
          ...item,
          cover: item.video.cover,
          title: item.video.title,
        },
        actions: [YoutubeModeQueueItemAction.CANCEL],
      })),
    };

    return queue;
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async makeWaitlistYoutubeModeCurrent(
    @Args({ name: 'channelId' }) channelId: string
  ) {
    await this.waitlistYoutubeService.init(channelId);

    // Use channel service here
    await this.prisma.channel.update({
      where: { id: channelId },
      data: { mode: ChannelMode.YOUTUBE },
    });

    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async waitlistYoutubeQueueAddVideo(
    @Args({ name: 'channelId' }) channelId: string,
    @Args({ name: 'videoId' }) videoId: string,
    @Context('userId') userId: string
  ) {
    await this.waitlistYoutubeService.addVideo({ channelId, userId, videoId });
    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async waitlistYoutubeQueueSkipVideo(
    @Args({ name: 'channelId' }) channelId: string,
    @Context('userId') userId: string
  ) {
    await this.waitlistYoutubeService.skipVideo({ channelId });

    return true;
  }

  @Subscription(() => Boolean, {
    filter: ({ channelId }, args) => channelId === args.channelId,
  })
  waitlistYoutubeCurrentUpdated(
    @Args({ name: 'channelId', type: () => String }) channelId: string
  ) {
    return this.pubsub.asyncIterator('waitlistYoutubeCurrentUpdated');
  }

  @Subscription(() => Boolean, {
    filter: ({ channelId }, args) => channelId === args.channelId,
  })
  waitlistYoutubeQueueUpdated(
    @Args({ name: 'channelId', type: () => String }) channelId: string
  ) {
    return this.pubsub.asyncIterator('waitlistYoutubeQueueUpdated');
  }

  @Subscription(() => Boolean, {
    filter: ({ channelId }, args) => channelId === args.channelId,
  })
  waitlistYoutubeHistoryUpdated(
    @Args({ name: 'channelId', type: () => String }) channelId: string
  ) {
    return this.pubsub.asyncIterator('waitlistYoutubeHistoryUpdated');
  }
}
