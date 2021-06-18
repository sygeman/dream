import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@dream/prisma';
import { TwitchStream } from './models/twitch-stream.model';
import { Inject, UseGuards } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { UpdateTwitchStreamInput } from './dto/update-twitch-stream.input';
import { AuthGuard } from '@dream/auth-api';
import { TwitchStreamService } from './twitch-stream.service';
import { ChannelMode } from '.prisma/client';

@Resolver()
export class TwitchStreamResolver {
  constructor(
    private prisma: PrismaService,
    private twitchStreamService: TwitchStreamService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  @Query(() => TwitchStream)
  twitchStream(@Args({ name: 'channelId' }) channelId: string) {
    return this.prisma.modeTwitchStream.findFirst({
      where: { channel: { id: channelId } },
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async makeTwitchStreamModeCurrent(
    @Args({ name: 'channelId' }) channelId: string
  ) {
    await this.twitchStreamService.init(channelId);

    // Use channel service here
    await this.prisma.channel.update({
      where: { id: channelId },
      data: { mode: ChannelMode.STREAM_TWITCH },
    });

    return true;
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

    return this.twitchStreamService.update({
      channelId: input?.channelId,
      channelKey: input.channelKey,
    });
  }
}
