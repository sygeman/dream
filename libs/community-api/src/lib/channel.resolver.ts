import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@dream/prisma';
import { Channel } from './models/channel.model';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Inject } from '@nestjs/common';

@Resolver(() => Channel)
export class ChannelResolver {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  @ResolveField()
  async onlineCount(@Parent() channel: Channel) {
    const { id } = channel;
    const connections = await this.prisma.connection.findMany({
      where: {
        channel: {
          id,
        },
      },
      select: { ipHash: true },
      distinct: ['ipHash'],
    });

    return connections.length;
  }

  @Query(() => Channel)
  channel(@Args({ name: 'name', type: () => String }) name: string) {
    return this.prisma.channel.findFirst({
      where: { name },
    });
  }

  @Query(() => [Channel])
  channels(@Args({ name: 'name', type: () => String }) name: string) {
    return this.prisma.channel.findMany({
      where: {
        community: {
          name,
        },
      },
    });
  }
}
