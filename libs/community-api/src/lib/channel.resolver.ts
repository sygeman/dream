import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PrismaService } from '@dream/prisma';
import { Channel } from './models/channel.model';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Inject } from '@nestjs/common';

@Resolver(() => Channel)
export class ChannelResolver {
  constructor(
    private readonly prisma: PrismaService, // private readonly userService: UsersService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  @ResolveField()
  async onlineCount(@Parent() channel: Channel) {
    const { id } = channel;
    const connections = await this.prisma.connection.findMany({
      where: {
        Channel: {
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
        Community: {
          name,
        },
      },
    });
  }

  @Subscription(() => Channel, {
    filter: ({ channelUpdated }, { channelId }) =>
      channelUpdated.channelId === channelId,
  })
  channelUpdated(@Args({ name: 'id', type: () => ID }) channelId: string) {
    return this.pubsub.asyncIterator('channelUpdated');
  }
}
