import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@dream/pepega-prisma';
import * as querystring from 'querystring';
import axios from 'axios';

@Injectable()
export class TwitchService {
  private readonly logger = new Logger(TwitchService.name);
  headers: any = {};

  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService
  ) {
    this.headers['Client-ID'] = config.get('authTwitch.clientID');
    this.headers.Accept = 'application/vnd.twitchtv.v5+json';
  }

  public async onModuleInit() {
    this.httpService.axiosRef.interceptors.response.use(
      (response) => response,
      async (error) => {
        const config = error.config;

        if (error.response.status === 401 && !config._retry) {
          config._retry = true;

          const authorization = config.headers['authorization'] || '';

          const accessToken = authorization.split(' ')?.[1];

          const profile = await this.prisma.profile.findFirst({
            where: { accessToken },
          });

          const newAccessToken = await this.refreshToken(profile.userId);

          return axios({
            ...config,
            headers: {
              ...config.headers,
              authorization: `Bearer ${newAccessToken}`,
            },
          });
        }

        return Promise.reject(error);
      }
    );
  }

  async getToken(userId: string) {
    const profile = await this.prisma.profile.findFirst({
      where: { userId },
    });

    return profile?.accessToken || '';
  }

  async refreshToken(userId: string) {
    this.logger.log('refreshToken', userId);
    const profile = await this.prisma.profile.findFirst({
      where: { userId, provider: 'twitch' },
    });

    const { refreshToken } = profile;
    const { clientID, clientSecret } = this.config.get('authTwitch');

    const res = await this.httpService
      .post(
        'https://id.twitch.tv/oauth2/token',
        querystring.stringify({
          grant_type: 'refresh_token',
          client_id: clientID,
          client_secret: clientSecret,
          refresh_token: refreshToken,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .toPromise();

    const accessToken = res?.data?.access_token;

    if (!accessToken) {
      throw new Error('fail');
    }

    await this.prisma.profile.update({
      where: { id: profile.id },
      data: { accessToken },
    });

    return accessToken;
  }

  async helixGet(path: string, params: any, userId?: string) {
    const profile = await this.prisma.profile.findFirst({
      select: { accessToken: true },
      where: userId ? { userId } : { NOT: { accessToken: null } },
    });

    try {
      const { accessToken } = profile;

      const headers = {
        'Client-ID': this.config.get('authTwitch.clientID'),
      };

      if (profile) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }

      return await this.httpService
        .get(`https://api.twitch.tv/helix/${path}`, { headers, params })
        .toPromise();
    } catch (error) {
      console.log(error);
      throw 'Helix Get Error';
    }
  }

  async clips(params: {
    broadcaster_id?: string;
    game_id?: string;
    id?: string;
    first?: number;
    after?: string;
    started_at?: string;
    ended_at?: string;
  }) {
    const query = await this.helixGet('clips', params);
    return query.data;
  }

  async follows(params: { from_id?: string }, userId: string) {
    const query = await this.helixGet('users/follows', params, userId);
    return query.data;
  }
}
