import { Injectable } from '@nestjs/common';
import { PrismaService } from '@dream/pepega-prisma';
import { TwitchService } from '@dream/pepega/twitch/api';

@Injectable()
export class ClipService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly twitch: TwitchService
  ) {}

  async clip(clipId: string) {
    const clipFromDB = await this.prisma.clip.findUnique({
      where: { id: clipId },
    });

    if (clipFromDB) return clipFromDB;
    const twitchClips = await this.twitch.clips({ id: clipId, first: 1 });

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
}
