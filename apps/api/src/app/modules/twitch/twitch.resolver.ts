import { Query, Resolver, Args, Context } from '@nestjs/graphql';
import { TwitchService } from './twitch.service';
import { ProfileService } from '../profile/profile.service';
import { Logger } from '@nestjs/common';
import { TwitchClipOld } from './models/twitchClipOld';
import { TwitchStream } from './models/twitchStream';
import { TwitchGame } from './models/twitchGame';
import { TwitchUser } from './models/twitchUser';
import { TwitchFollows } from './models/twitchFollows';
import { TwitchStreamArgs } from './dto/twitchStream.args';
import { TwitchTopClipsArgs } from './dto/twitchTopClips.args';
import { TwitchGameArgs } from './dto/twitchGame.args';
import { TwitchClips } from './models/twitchClips';
import { Int } from '@nestjs/graphql';

@Resolver()
export class TwitchResolvers {
  constructor(
    private readonly twitch: TwitchService,
    private readonly profile: ProfileService
  ) {}

  @Query((returns) => TwitchClipOld)
  async twitchClip(@Args('id') id: string) {
    return await this.twitch.clip(id);
  }

  @Query((returns) => TwitchFollows)
  async twitchFollows(
    @Args({ name: 'from_id', type: () => String, nullable: true })
    from_id: string,
    @Args({ name: 'first', type: () => Int, nullable: true }) first: number,
    @Args({ name: 'after', type: () => String, nullable: true }) after: string,
    @Context('userData') userData
  ) {
    if (!from_id) {
      if (!userData) {
        throw new Error('Deny');
      }

      const profile = await this.profile.findOne({
        where: {
          serviceName: 'twitch',
          userId: userData.userId,
        },
      });

      if (!profile) {
        throw new Error('Deny');
      }

      from_id = profile.serviceId;
    }

    return await this.twitch.follows({ from_id, first, after });
  }

  @Query((returns) => TwitchClips)
  async twitchClips(
    @Args({ name: 'id', nullable: true, type: () => String }) id?: string,
    @Args({ name: 'broadcaster_id', nullable: true, type: () => String })
    broadcaster_id?: string,
    @Args({ name: 'game_id', nullable: true, type: () => String })
    game_id?: string,
    @Args({ name: 'first', nullable: true, type: () => Int }) first?: number,
    @Args({ name: 'after', nullable: true, type: () => String }) after?: string,
    @Args({ name: 'started_at', nullable: true, type: () => String })
    started_at?: string,
    @Args({ name: 'ended_at', nullable: true, type: () => String })
    ended_at?: string
  ) {
    const data = await this.twitch.clips({
      broadcaster_id,
      id,
      game_id,
      first,
      after,
      started_at,
      ended_at,
    });

    return data;
  }

  @Query((returns) => [TwitchGame])
  async twitchGame(@Args() args: TwitchGameArgs) {
    const games = await this.twitch.game(args);
    return games.data;
  }

  @Query((returns) => [TwitchGame])
  async twitchTopGames(
    @Args({ name: 'first', type: () => Int, nullable: true }) first: number
  ) {
    const games = await this.twitch.topGames({ first });
    return games.data;
  }

  @Query((returns) => [TwitchClipOld])
  async twitchTopClips(@Args() args: TwitchTopClipsArgs) {
    const { channel, game, limit } = args;

    try {
      const clips = await this.twitch.topClips({
        channel,
        game,
        language: !channel ? 'ru' : undefined,
        limit: limit || 15,
      });

      return clips;
    } catch (error) {
      Logger.error(error, 'Query:twitchTopClips');
      return [];
    }
  }

  @Query((returns) => TwitchStream, { nullable: true })
  async twitchStream(@Args() args: TwitchStreamArgs) {
    return this.twitch.stream(args);
  }

  @Query((returns) => TwitchUser)
  async twitchUser(@Args('userId') userId: string) {
    return this.twitch.user({ id: userId });
  }
}
