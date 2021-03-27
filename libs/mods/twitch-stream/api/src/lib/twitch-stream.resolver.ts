import { Args, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@dream/prisma';
import { TwitchStream } from './models/twitch-stream.model';
import { Inject } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Resolver()
export class TwitchStreamResolver {
  constructor(
    private prisma: PrismaService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  @Query(() => TwitchStream)
  twitchStream(@Args({ name: 'channelName' }) channelName: string) {
    return this.prisma.modeTwitchStream.findFirst({
      where: { channel: { name: channelName } },
    });
  }
}
