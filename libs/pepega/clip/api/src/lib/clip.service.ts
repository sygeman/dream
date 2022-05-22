import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@dream/pepega-prisma';

@Injectable()
export class ClipService {
  headers: any = {};

  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService
  ) {
    this.headers['Client-ID'] = config.get('authTwitch.clientID');
    this.headers.Accept = 'application/vnd.twitchtv.v5+json';
  }

  async clip(clipId: string) {
    const clipFromDB = await this.prisma.clip.findUnique({
      where: { id: clipId },
    });

    if (clipFromDB) return clipFromDB;
    const twitchClips = await this.clips({ id: clipId, first: 1 });

    if (!twitchClips.data || twitchClips.data.length !== 1) {
      throw new Error(`Clip ${clipId} not found`);
    }

    const twitchClip = twitchClips.data[0];

    return this.prisma.clip.create({
      data: {
        id: twitchClip.id,
        broadcaster_id: twitchClip.broadcaster_id,
        broadcaster_name: twitchClip.broadcaster_name,
        creator_id: twitchClip.creator_id,
        creator_name: twitchClip.creator_name,
        video_id: twitchClip.video_id,
        game_id: twitchClip.game_id,
        language: twitchClip.language,
        title: twitchClip.title,
        view_count: twitchClip.view_count,
        created_at: twitchClip.created_at,
        thumbnail_url: twitchClip.thumbnail_url,
        duration: twitchClip.duration,
      },
    });
  }

  async helixGet(path: string, params: any) {
    const profile = await this.prisma.profile.findFirst({
      select: { accessToken: true },
      where: { NOT: { accessToken: null } },
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
}
