import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@dream/prisma';
import { TwitchStream } from './models/twitch-stream.model';
import { UseGuards } from '@nestjs/common';
import { UpdateTwitchStreamInput } from './dto/update-twitch-stream.input';
import { AuthGuard } from '@dream/auth-api';
import { TwitchModeService } from './twitch-mode.service';
import { ChannelMode } from '@prisma/client';

@Resolver()
export class TwitchModeResolver {
  constructor(
    private prisma: PrismaService,
    private twitchModeService: TwitchModeService
  ) {}

  @Query(() => TwitchStream)
  twitchStream(@Args({ name: 'channelId' }) channelId: string) {
    return this.prisma.twitchMode.findFirst({
      where: { channel: { id: channelId } },
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async makeTwitchStreamModeCurrent(
    @Args({ name: 'channelId' }) channelId: string
  ) {
    await this.twitchModeService.init(channelId);

    // Use channel service here
    await this.prisma.channel.update({
      where: { id: channelId },
      data: { mode: ChannelMode.TWITCH },
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

    return this.twitchModeService.update({
      channelId: input?.channelId,
      channelKey: input.channelKey,
    });
  }
}
