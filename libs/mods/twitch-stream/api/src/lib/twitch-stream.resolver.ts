import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@dream/prisma';
import { TwitchStream } from './models/twitch-stream.model';
import { Inject } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { UpdateTwitchStreamInput } from './dto/update-twitch-stream.input';

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

  @Mutation(() => TwitchStream)
  updateTwitchStream(
    @Args({ name: 'input', type: () => UpdateTwitchStreamInput })
    input: UpdateTwitchStreamInput
  ) {
    return this.prisma.modeTwitchStream.update({
      where: { id: input.id },
      data: { channelKey: input.channelKey },
    });
  }
}
