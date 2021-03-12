import { PrismaService } from '@dream/prisma';
import { HttpService, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as querystring from 'querystring';
import axios from 'axios';

@Injectable()
export class SpotifyService implements OnModuleInit {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
    private readonly config: ConfigService
  ) {}

  public async onModuleInit() {
    this.httpService.axiosRef.interceptors.response.use(
      (response) => response,
      async (error) => {
        const config = error.config;

        if (error.response.status === 401 && !config._retry) {
          config._retry = true;

          const accessToken = config.headers['authorization'].split(' ')[1];

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

    const d = await this.getMePlayer('cklxztcja00753v5v9hn1w2nn');

    Logger.log(d.data?.item?.name);
  }

  async getToken(userId: string) {
    const profile = await this.prisma.profile.findFirst({
      where: { userId },
    });

    return profile?.accessToken || '';
  }

  async refreshToken(userId: string) {
    Logger.log('refreshToken', userId);
    const profile = await this.prisma.profile.findFirst({
      where: { userId, provider: 'spotify' },
    });

    const { refreshToken } = profile;

    const { clientID, clientSecret } = this.config.get('authSpotify');
    const token = Buffer.from(clientID + ':' + clientSecret).toString('base64');

    const res = await this.httpService
      .post(
        'https://accounts.spotify.com/api/token',
        querystring.stringify({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }),
        {
          headers: {
            // <base64 encoded client_id:client_secret>
            Authorization: `Basic ${token}`,
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

  async getMePlayer(userId: string) {
    const token = await this.getToken(userId);

    return this.httpService
      .get('https://api.spotify.com/v1/me/player', {
        headers: { authorization: `Bearer ${token}` },
      })
      .toPromise();
  }
}
