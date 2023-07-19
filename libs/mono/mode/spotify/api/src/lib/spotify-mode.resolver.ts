import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PrismaService } from '@dream/mono-prisma';
import { Inject, UseGuards } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { AuthGuard } from '@dream/mono-auth-api';
import { SpotifyModeService } from './spotify-mode.service';
import { SpotifyModeQueueAction } from './models/queue/action';
import { SpotifyModeHistoryItemAction } from './models/history/item-action';
import { SpotifyModeQueueItemAction } from './models/queue/item-action';
import { SpotifyModeCurrentAction } from './models/current/action';
import { SpotifyModeHistory } from './models/history/model';
import { SpotifyModeCurrent } from './models/current/model';
import { SpotifyModeQueue } from './models/queue/model';
import { ChannelMode } from '@prisma/client';
import { SpotifyMode } from './models/spotify-mode.model';
import { UpdateSpotifyModeInput } from './dto/update-spotify-mode.input';
import { SpotifyModeCurrentService } from './services/current.service';

@Resolver()
export class SpotifyModeResolver {
  constructor(
    private prisma: PrismaService,
    private spotifyModeService: SpotifyModeService,
    private currentService: SpotifyModeCurrentService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub,
  ) {}

  @Query(() => SpotifyMode)
  async spotifyMode(@Args({ name: 'channelId' }) channelId: string) {
    return this.prisma.spotifyMode.findFirst({
      where: { channelId },
    });
  }

  @Query(() => SpotifyModeHistory)
  async spotifyModeHistory(@Args({ name: 'channelId' }) channelId: string) {
    const historyItems = await this.prisma.spotifyModeItem.findMany({
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
        actions: [SpotifyModeHistoryItemAction.ADD_TO_QUEUE],
      })),
    };

    return history;
  }

  @Query(() => SpotifyModeCurrent, { nullable: true })
  async spotifyModeCurrent(
    @Args({ name: 'channelId' }) channelId: string,
    @Context('userId') userId: string,
  ) {
    const modeData = await this.prisma.spotifyMode.findFirst({
      where: { channel: { id: channelId } },
      include: {
        item: { include: { track: true, author: true } },
      },
    });

    if (!modeData?.item) {
      return null;
    }

    let actions = [];

    if (modeData.item.authorId === userId) {
      actions = [...actions, SpotifyModeCurrentAction.SKIP];
    }

    const current = {
      item: {
        ...modeData.item,
        cover: modeData.item.track.cover,
        artists: modeData.item.track.artists,
        title: modeData.item.track.title,
      },
      actions,
    };

    return current;
  }

  @Query(() => SpotifyModeQueue)
  async spotifyModeQueue(@Args({ name: 'channelId' }) channelId: string) {
    const queueItems = await this.prisma.spotifyModeItem.findMany({
      where: {
        channel: { id: channelId },
        startedAt: null,
        canceled: false,
      },
      include: { track: true, author: true },
      take: 15,
    });

    const queue = {
      actions: [SpotifyModeQueueAction.ADD_TRACK],
      items: queueItems.map((item) => ({
        data: {
          ...item,
          cover: item.track.cover,
          artists: item.track.artists,
          title: item.track.title,
        },
        actions: [SpotifyModeQueueItemAction.CANCEL],
      })),
    };

    return queue;
  }

  @Mutation(() => SpotifyMode)
  @UseGuards(AuthGuard)
  async updateSpotifyMode(
    @Args({ name: 'input', type: () => UpdateSpotifyModeInput })
    input: UpdateSpotifyModeInput,
    @Context('userId') userId: string,
  ) {
    const channelIsExist = await this.prisma.channel.findFirst({
      where: {
        id: input?.channelId,
        community: {
          ownerId: userId,
        },
      },
    });

    if (!channelIsExist) {
      throw 'Deny';
    }

    return this.spotifyModeService.update({
      channelId: input?.channelId,
      strategy: input.strategy,
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async makeSpotifyModeCurrent(@Args({ name: 'channelId' }) channelId: string) {
    await this.spotifyModeService.init(channelId);

    // Use channel service here
    await this.prisma.channel.update({
      where: { id: channelId },
      data: { mode: ChannelMode.SPOTIFY },
    });

    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async spotifyModeQueueAddTrack(
    @Args({ name: 'channelId' }) channelId: string,
    @Args({ name: 'trackId' }) trackId: string,
    @Context('userId') userId: string,
  ) {
    await this.currentService.add({ channelId, userId, trackId });
    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async spotifyModeQueueSkipTrack(
    @Args({ name: 'channelId' }) channelId: string,
    @Context('userId') userId: string,
  ) {
    const modeData = await this.prisma.spotifyMode.findFirst({
      where: { channel: { id: channelId } },
      include: {
        item: { include: { track: true, author: true } },
      },
    });

    if (modeData.item.authorId !== userId) {
      throw new Error('Deny');
    }

    await this.currentService.skip({ channelId });

    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async spotifyModeUserSync(
    @Args({ name: 'channelId' }) channelId: string,
    @Context('userId') userId: string,
  ) {
    await this.spotifyModeService.syncUserSpotify({ channelId, userId });
    return true;
  }

  @Subscription(() => Boolean, {
    filter: ({ channelId }, args) => channelId === args.channelId,
  })
  spotifyModeCurrentUpdated(
    @Args({ name: 'channelId', type: () => String }) channelId: string,
  ) {
    return this.pubsub.asyncIterator('spotifyModeCurrentUpdated');
  }

  @Subscription(() => Boolean, {
    filter: ({ channelId }, args) => channelId === args.channelId,
  })
  spotifyModeQueueUpdated(
    @Args({ name: 'channelId', type: () => String }) channelId: string,
  ) {
    return this.pubsub.asyncIterator('spotifyModeQueueUpdated');
  }

  @Subscription(() => Boolean, {
    filter: ({ channelId }, args) => channelId === args.channelId,
  })
  spotifyModeHistoryUpdated(
    @Args({ name: 'channelId', type: () => String }) channelId: string,
  ) {
    return this.pubsub.asyncIterator('spotifyModeHistoryUpdated');
  }
}
