import {
  Args,
  Context,
  ID,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { ChannelMessageCreateInput } from './dto/channelMessage.create.input';
import { PrismaService } from '@dream/prisma';
import { ChannelMessage } from './models/message.model';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Inject, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@dream/auth-api';

@Resolver(() => ChannelMessage)
export class ChannelMessageResolver {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  @Query(() => [ChannelMessage])
  async channelMessages(
    @Args({ name: 'channelId', type: () => ID }) channelId: string
  ) {
    const messages = await this.prisma.channelMessage.findMany({
      where: {
        channelId,
        deleted: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
      include: {
        user: true,
      },
    });

    return messages.reverse();
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async createChannelMessage(
    @Args('input') input: ChannelMessageCreateInput,
    @Context('userId') userId: string
  ) {
    const { content, channelId } = input;

    const message = await this.prisma.channelMessage.create({
      data: {
        content,
        channel: {
          connect: {
            id: channelId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        user: true,
      },
    });

    this.pubsub.publish('channelMessageCreated', {
      channelMessageCreated: message,
    });
    return true;
  }

  @Subscription(() => ChannelMessage, {
    filter: ({ channelMessageCreated }, { channelId }) =>
      channelMessageCreated.channelId === channelId,
  })
  channelMessageCreated(
    @Args({ name: 'channelId', type: () => ID }) channelId: string
  ) {
    return this.pubsub.asyncIterator('channelMessageCreated');
  }

  @Subscription(() => ChannelMessage, {
    filter: ({ channelMessageDeleted, channelId }) =>
      channelMessageDeleted.channelId === channelId,
  })
  channelMessageDeleted(
    @Args({ name: 'channelId', type: () => ID }) channelId: string
  ) {
    return this.pubsub.asyncIterator('channelMessageDeleted');
  }
}
