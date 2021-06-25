// const current = (await this.spotifyService.getMePlayer(userId))?.data;

import { PrismaService } from '@dream/prisma';
import { SpotifyService } from '@dream/external-api/spotify';
import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Queue } from 'bull';
import { SpotifyModeCurrentService } from './current.service';
import { SpotifyMode } from '@prisma/client';

@Injectable()
export class SpotifyModeHostService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SpotifyModeHostService.name);

  constructor(
    private prisma: PrismaService,
    private spotify: SpotifyService,
    private currentService: SpotifyModeCurrentService,
    @InjectQueue('spotifyMode')
    private readonly spotifyModeQueue: Queue
  ) {}

  onApplicationBootstrap() {
    this.spotifyModeQueue.add('syncHost', null, {
      repeat: { every: 5000 },
      removeOnComplete: true,
      removeOnFail: true,
    });
  }

  syncHostForChannel = async (spotifyMode: SpotifyMode) => {
    this.logger.log(`Sync Host for ${spotifyMode.id}`);

    const current = (await this.spotify.getMePlayer(spotifyMode.hostId))?.data;
    const hostCurrentId = (current?.timestamp || '').toString();
    const trackId = current?.item?.id;

    if (!current || !current?.is_playing) {
      if (!spotifyMode.hostCurrentId) {
        return;
      }

      this.logger.log('skip');

      await this.prisma.spotifyMode.update({
        where: { id: spotifyMode.id },
        data: { hostCurrentId: null },
      });
      return this.currentService.skip({
        channelId: spotifyMode.channelId,
      });
    }

    if (spotifyMode.hostCurrentId === hostCurrentId) {
      return;
    }

    this.logger.log(`new hostCurrentId - ${hostCurrentId}`);

    await this.prisma.spotifyMode.update({
      where: { id: spotifyMode.id },
      data: { hostCurrentId },
    });

    this.logger.log('new item');

    await this.currentService.skip({
      channelId: spotifyMode.channelId,
    });

    this.logger.log(current?.progress_ms);

    // set new current item
    return this.currentService.add({
      channelId: spotifyMode.channelId,
      trackId,
      userId: spotifyMode.hostId,
      start: current?.progress_ms || 0,
    });
  };

  syncHost = async () => {
    const spotifyMods = await this.prisma.spotifyMode.findMany({
      where: {
        strategy: 'HOST',
        hostId: {
          notIn: null,
        },
        channel: {
          deleted: false,
        },
      },
    });

    spotifyMods.map(this.syncHostForChannel);

    return;
  };
}
