import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@dream/prisma';
import { TwitchStream } from './models/twitch-stream.model';
import { Inject, UseGuards } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { UpdateTwitchStreamInput } from './dto/update-twitch-stream.input';
import { AuthGuard } from '@dream/auth-api';

@Resolver()
export class TwitchStreamResolver {
  constructor(
    private prisma: PrismaService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  @Query(() => TwitchStream)
  twitchStream(@Args({ name: 'channelId' }) channelId: string) {
    return this.prisma.modeTwitchStream.findFirst({
      where: { channel: { id: channelId } },
    });
  }

  @Mutation(() => TwitchStream)
  @UseGuards(AuthGuard)
  async updateTwitchStream(
    @Args({ name: 'input', type: () => UpdateTwitchStreamInput })
    input: UpdateTwitchStreamInput,
    @Context('userId') userId: string
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

    const twitchStream = await this.prisma.modeTwitchStream.findFirst({
      where: { channelId: input?.channelId },
    });

    if (twitchStream) {
      return await this.prisma.modeTwitchStream.update({
        where: { id: twitchStream.id },
        data: { channelKey: input.channelKey },
      });
    }

    return this.prisma.modeTwitchStream.create({
      data: {
        channel: {
          connect: {
            id: input?.channelId,
          },
        },
        channelKey: input.channelKey,
      },
    });
  }
}
