import { Context, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@dream/pepega-prisma';
import { TwitchChannel } from './models/twitch-channel.model';
import { AuthGuard } from '@dream/pepega/auth/api';
import { UseGuards } from '@nestjs/common';
import { TwitchService } from '@dream/pepega/twitch/api';

@Resolver(() => TwitchChannel)
export class FollowsResolver {
  constructor(
    private prisma: PrismaService,
    private readonly twitch: TwitchService
  ) {}

  @Query(() => [TwitchChannel])
  @UseGuards(AuthGuard)
  async follows(@Context('userId') userId: string) {
    const profile = await this.prisma.profile.findFirst({ where: { userId } });
    const twitchId = profile.serviceId;

    const query = await this.twitch.helixGet(
      'users/follows',
      { from_id: twitchId, first: 100 },
      userId
    );

    const channelsIds = query?.data?.data.map((channel) => channel.to_id);

    const usersQuery = await this.twitch.helixGet(
      'users',
      { id: channelsIds },
      userId
    );

    return usersQuery.data.data;
  }
}
