import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PrismaService } from '@dream/prisma';
import { Inject, Logger, UseGuards } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { AuthGuard } from '@dream/auth-api';
import { WaitlistYoutubeService } from './waitlist-youtube.service';
import { ModeWaitlistYoutubeQueueAction } from './models/queue/action';
import { ModeWaitlistYoutubeHistoryItemAction } from './models/history/item-action';
import { ModeWaitlistYoutubeQueueItemAction } from './models/queue/item-action';
import { ModeWaitlistYoutubeCurrentAction } from './models/current/action';
import { ModeWaitlistYoutubeHistory } from './models/history/model';
import { ModeWaitlistYoutubeCurrent } from './models/current/model';
import { ModeWaitlistYoutubeQueue } from './models/queue/model';

@Resolver()
export class WaitlistYoutubeResolver {
  constructor(
    private prisma: PrismaService,
    private waitlistYoutubeService: WaitlistYoutubeService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  @Query(() => ModeWaitlistYoutubeHistory)
  async waitlistYoutubeHistory(@Args({ name: 'channelId' }) channelId: string) {
    const historyItems = await this.prisma.modeWaitlistYoutubeItem.findMany({
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
        actions: [ModeWaitlistYoutubeHistoryItemAction.ADD_TO_QUEUE],
      })),
    };

    return history;
  }

  @Query(() => ModeWaitlistYoutubeCurrent, { nullable: true })
  async waitlistYoutubeCurrent(@Args({ name: 'channelId' }) channelId: string) {
    const modeData = await this.prisma.modeWaitlistYoutube.findFirst({
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
      actions: [ModeWaitlistYoutubeCurrentAction.SKIP],
    };

    return current;
  }

  @Query(() => ModeWaitlistYoutubeQueue)
  async waitlistYoutubeQueue(@Args({ name: 'channelId' }) channelId: string) {
    const queueItems = await this.prisma.modeWaitlistYoutubeItem.findMany({
      where: {
        channel: { id: channelId },
        startedAt: null,
        canceled: false,
      },
      include: { video: true, author: true },
      take: 15,
    });

    const queue = {
      actions: [ModeWaitlistYoutubeQueueAction.ADD_VIDEO],
      items: queueItems.map((item) => ({
        data: {
          ...item,
          cover: item.video.cover,
          title: item.video.title,
        },
        actions: [ModeWaitlistYoutubeQueueItemAction.CANCEL],
      })),
    };

    return queue;
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
