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
import { PrismaService } from '@dream/mono-prisma';
import { ChannelMessage } from './models/message.model';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Inject, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@dream/mono-auth-api';
import { TenorService } from '@dream/mono-external-tenor';

@Resolver(() => ChannelMessage)
export class ChannelMessageResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tenor: TenorService,
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
        tenorGifId: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
      include: {
        user: true,
        tenorGif: true,
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

    const tenorGifMatch = content.match(
      /https\:\/\/tenor\.com\/view(.+)gif-([0-9]+)/
    );

    const tenorGifId = tenorGifMatch?.[2];

    if (tenorGifId) {
      await this.tenor.getGif(tenorGifId);
    }

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
        tenorGif: tenorGifId && {
          connect: {
            id: tenorGifId,
          },
        },
      },
      include: {
        user: true,
        tenorGif: true,
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
