import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ProfileService } from '../profile/profile.service';
import { Not, IsNull } from 'typeorm';
import { TwitchClips } from './models/twitchClips';

@Injectable()
export class TwitchService {
  headers: any = {};

  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
    private readonly profile: ProfileService
  ) {
    this.headers['Client-ID'] = config.get('authTwitch.clientID');
    this.headers.Accept = 'application/vnd.twitchtv.v5+json';
  }

  async helixGet(path: string, params: any) {
    const profile = await this.profile.findOne({
      select: ['accessToken'],
      where: { accessToken: Not(IsNull()), serviceName: 'twitch' },
      order: {
        updatedAt: 'DESC'
      }
    });

    try {
      const { accessToken } = profile;

      const headers = {
        'Client-ID': this.config.get('authTwitch.clientID')
      };

      if (profile) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }

      return await this.httpService
        .get(`https://api.twitch.tv/helix/${path}`, { headers, params })
        .toPromise();
    } catch (error) {
      // console.log(error);
      throw 'Helix Get Error';
    }
  }

  async user({ id, userName }: { id?: string; userName?: string }) {
    if (!id && !userName) {
      throw new Error('Invalid args');
    }

    const params: any = {
      first: 1
    };

    if (userName) {
      params.login = userName;
    } else if (id) {
      params.id = id;
    }

    const query = await this.helixGet('users', params);
    return query.data.data.length > 0 ? query.data.data[0] : null;
  }

  async stream({ userId, userName }: { userId?: string; userName?: string }) {
    if (!userId && !userName) {
      throw new Error('Invalid args');
    }

    const params: any = {
      first: 1
    };

    if (userName) {
      params.user_login = userName;
    } else if (userId) {
      params.user_id = userId;
    }

    const query = await this.helixGet('streams', params);
    return query.data.data.length > 0 ? query.data.data[0] : null;
  }

  async clips(params: {
    broadcaster_id?: string;
    game_id?: string;
    id?: string;
    first?: number;
    after?: string;
    started_at?: string;
    ended_at?: string;
  }): Promise<TwitchClips> {
    const query = await this.helixGet('clips', params);
    return query.data;
  }

  async follows(params: {
    to_id?: string;
    from_id?: string;
    first?: number;
    after?: string;
  }) {
    const query = await this.helixGet('users/follows', params);
    return query.data;
  }

  async game(params) {
    const query = await this.helixGet('games', params);
    return query.data;
  }

  async topGames(params: { after?: string; before?: string; first?: number }) {
    const query = await this.helixGet('games/top', params);
    return query.data;
  }

  // OLD
  async clip(id: string) {
    const query = await this.httpService
      .get(`https://api.twitch.tv/kraken/clips/${id}`, {
        headers: this.headers
      })
      .toPromise();

    return query.data;
  }

  async followsOld({ twitchUserId, limit = 20, offset = 0 }) {
    const query = await this.httpService
      .get(
        `https://api.twitch.tv/kraken/users/${twitchUserId}/follows/channels`,
        {
          params: {
            limit,
            offset,
            sortby: 'last_broadcast'
          },
          headers: this.headers
        }
      )
      .toPromise();

    return {
      count: query.data._total,
      follows: query.data.follows.map(({ channel }) => ({
        title: channel.display_name,
        name: channel.name
      }))
    };
  }

  async topClips(topClipsArgs: {
    channel?;
    game?;
    language: string;
    limit?: number;
  }) {
    const { channel, game, language, limit } = topClipsArgs;

    const params = {
      channel,
      game,
      language,
      period: 'day',
      limit: limit || 15
    };

    const query = await this.httpService
      .get(`https://api.twitch.tv/kraken/clips/top`, {
        params,
        headers: this.headers
      })
      .toPromise()
      .catch(error => {
        Logger.error(error);
        return null;
      });

    if (!query) {
      return [];
    }

    return query.data.clips.map(clip => ({
      id: clip.slug,
      channel: clip.broadcaster.name,
      title: clip.title,
      createdAt: clip.created_at,
      thumbnails: clip.thumbnails,
      broadcaster: clip.broadcaster,
      viewsCount: clip.views
    }));
  }
}
