import { PrismaService } from '@dream/prisma';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import * as querystring from 'querystring';
import axios from 'axios';

@Injectable()
export class SpotifyService implements OnModuleInit {
  private readonly logger = new Logger(SpotifyService.name);

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

  async getTrack(trackId: string, userId: string) {
    const token = await this.getToken(userId);

    return this.httpService
      .get(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .toPromise();
  }

  async setTrack(trackId: string, userId: string, position: number) {
    const token = await this.getToken(userId);

    return this.httpService
      .put(
        `https://api.spotify.com/v1/me/player/play`,
        {
          uris: [`spotify:track:${trackId}`],
          position_ms: position,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .toPromise();
  }

  async pause(userId: string) {
    this.logger.log('pause', userId);

    const token = await this.getToken(userId);

    this.logger.log('token', token);

    return this.httpService
      .put(`https://api.spotify.com/v1/me/player/pause`, undefined, {
        headers: { authorization: `Bearer ${token}` },
      })
      .toPromise();
  }

  async getFormatedTrack(trackId: string, userId: string) {
    const track = await this.prisma.spotifyTrack.findUnique({
      where: { id: trackId },
    });

    if (track) return track;

    const trackData = (await this.getTrack(trackId, userId))?.data;

    if (!trackData) throw 'Track not found';

    // Set track to queue
    const images = trackData?.album?.images || [];

    return this.prisma.spotifyTrack.create({
      data: {
        id: trackId,
        title: trackData?.name,
        artists: (trackData?.artists || [])
          .map((artist) => artist?.name)
          .join(', '),
        cover: images[images.length - 1]?.url,
        duration: trackData?.duration_ms,
      },
    });
  }
}
