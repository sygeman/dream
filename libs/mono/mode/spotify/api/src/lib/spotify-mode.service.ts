import { PrismaService } from '@dream/mono-prisma';
import { SpotifyService } from '@dream/mono-external-spotify';
import { Injectable, Logger } from '@nestjs/common';
import { SpotifyModeStrategy } from '@prisma/client';

@Injectable()
export class SpotifyModeService {
  private readonly logger = new Logger(SpotifyModeService.name);

  constructor(
    private prisma: PrismaService,
    private spotify: SpotifyService,
  ) {}

  async init(channelId: string) {
    const spotifyMode = await this.prisma.spotifyMode.findFirst({
      where: { channelId },
    });

    if (spotifyMode) return spotifyMode;

    return this.prisma.spotifyMode.create({
      data: {
        channel: { connect: { id: channelId } },
      },
    });
  }

  async update({
    channelId,
    strategy,
  }: {
    channelId: string;
    strategy?: SpotifyModeStrategy;
  }) {
    const spotifyMode = await this.init(channelId);

    return await this.prisma.spotifyMode.update({
      where: { id: spotifyMode.id },
      data: { strategy },
    });
  }

  async syncUserSpotify({ channelId, userId }) {
    const spotifyMode = await this.prisma.spotifyMode.findFirst({
      where: { channelId },
      include: { item: { include: { track: true } } },
    });

    const trackId = spotifyMode?.item?.trackId;

    if (!trackId) {
      try {
        return await this.spotify.pause(userId);
      } catch (error) {
        this.logger.error(error);
      }
    }

    const s = +new Date(+spotifyMode?.item?.startedAt);
    const now = +new Date();
    const position = now - s;

    try {
      await this.spotify.setTrack(trackId, userId, position);
    } catch (error) {
      this.logger.log(error);
    }
  }
}
