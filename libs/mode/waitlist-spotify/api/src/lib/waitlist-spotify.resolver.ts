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
import { WaitlistSpotifyService } from './waitlist-spotify.service';
import { ModeWaitlistSpotifyQueueAction } from './models/queue/action';
import { ModeWaitlistSpotifyHistoryItemAction } from './models/history/item-action';
import { ModeWaitlistSpotifyQueueItemAction } from './models/queue/item-action';
import { ModeWaitlistSpotifyCurrentAction } from './models/current/action';
import { ModeWaitlistSpotifyHistory } from './models/history/model';
import { ModeWaitlistSpotifyCurrent } from './models/current/model';
import { ModeWaitlistSpotifyQueue } from './models/queue/model';
import { ChannelMode } from '.prisma/client';

@Resolver()
export class WaitlistSpotifyResolver {
  constructor(
    private prisma: PrismaService,
    private waitlistSpotifyService: WaitlistSpotifyService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  @Query(() => ModeWaitlistSpotifyHistory)
  async waitlistSpotifyHistory(@Args({ name: 'channelId' }) channelId: string) {
    const historyItems = await this.prisma.modeWaitlistSpotifyItem.findMany({
      where: { channel: { id: channelId }, endedAt: { not: null } },
      orderBy: {
        createdAt: 'desc',
      },
      include: { track: true, author: true },
      take: 15,
    });

    const history = {
      items: historyItems.reverse().map((item) => ({
        data: {
          ...item,
          cover: item.track.cover,
          artists: item.track.artists,
          title: item.track.title,
        },
        actions: [ModeWaitlistSpotifyHistoryItemAction.ADD_TO_QUEUE],
      })),
    };

    return history;
  }

  @Query(() => ModeWaitlistSpotifyCurrent, { nullable: true })
  async waitlistSpotifyCurrent(@Args({ name: 'channelId' }) channelId: string) {
    const modeData = await this.prisma.modeWaitlistSpotify.findFirst({
      where: { channel: { id: channelId } },
      include: {
        item: { include: { track: true, author: true } },
      },
    });

    if (!modeData?.item) {
      return null;
    }

    const current = {
      item: {
        ...modeData.item,
        cover: modeData.item.track.cover,
        artists: modeData.item.track.artists,
        title: modeData.item.track.title,
      },
      actions: [ModeWaitlistSpotifyCurrentAction.SKIP],
    };

    return current;
  }

  @Query(() => ModeWaitlistSpotifyQueue)
  async waitlistSpotifyQueue(@Args({ name: 'channelId' }) channelId: string) {
    const queueItems = await this.prisma.modeWaitlistSpotifyItem.findMany({
      where: {
        channel: { id: channelId },
        startedAt: null,
        canceled: false,
      },
      include: { track: true, author: true },
      take: 15,
    });

    const queue = {
      actions: [ModeWaitlistSpotifyQueueAction.ADD_TRACK],
      items: queueItems.map((item) => ({
        data: {
          ...item,
          cover: item.track.cover,
          artists: item.track.artists,
          title: item.track.title,
        },
        actions: [ModeWaitlistSpotifyQueueItemAction.CANCEL],
      })),
    };

    return queue;
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async makeWaitlistSpotifyModeCurrent(
    @Args({ name: 'channelId' }) channelId: string
  ) {
    await this.waitlistSpotifyService.init(channelId);

    // Use channel service here
    await this.prisma.channel.update({
      where: { id: channelId },
      data: { mode: ChannelMode.WAITLIST_SPOTIFY },
    });

    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async waitlistSpotifyQueueAddTrack(
    @Args({ name: 'channelId' }) channelId: string,
    @Args({ name: 'trackId' }) trackId: string,
    @Context('userId') userId: string
  ) {
    await this.waitlistSpotifyService.addTrack({ channelId, userId, trackId });
    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async waitlistSpotifyQueueSkipTrack(
    @Args({ name: 'channelId' }) channelId: string,
    @Context('userId') userId: string
  ) {
    await this.waitlistSpotifyService.skipTrack({ channelId });

    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async waitlistSpotifyUserSync(
    @Args({ name: 'channelId' }) channelId: string,
    @Context('userId') userId: string
  ) {
    await this.waitlistSpotifyService.syncUserSpotify({ channelId, userId });
    return true;
  }

  @Subscription(() => Boolean, {
    filter: ({ channelId }, args) => channelId === args.channelId,
  })
  waitlistSpotifyCurrentUpdated(
    @Args({ name: 'channelId', type: () => String }) channelId: string
  ) {
    return this.pubsub.asyncIterator('waitlistSpotifyCurrentUpdated');
  }

  @Subscription(() => Boolean, {
    filter: ({ channelId }, args) => channelId === args.channelId,
  })
  waitlistSpotifyQueueUpdated(
    @Args({ name: 'channelId', type: () => String }) channelId: string
  ) {
    return this.pubsub.asyncIterator('waitlistSpotifyQueueUpdated');
  }

  @Subscription(() => Boolean, {
    filter: ({ channelId }, args) => channelId === args.channelId,
  })
  waitlistSpotifyHistoryUpdated(
    @Args({ name: 'channelId', type: () => String }) channelId: string
  ) {
    return this.pubsub.asyncIterator('waitlistSpotifyHistoryUpdated');
  }
}
