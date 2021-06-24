import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { PrismaModule } from '@dream/prisma';
import { SpotifyModule } from '@dream/external-api/spotify';
import { SpotifyModeResolver } from './spotify-mode.resolver';
import { SpotifyModeProcessor } from './spotify-mode.processor';
import { SpotifyModeService } from './spotify-mode.service';
import { SpotifyModeHostService } from './services/host.service';
import { SpotifyModeQueueService } from './services/queue.service';
import { SpotifyModeCurrentService } from './services/current.service';

@Module({
  imports: [
    PrismaModule,
    BullModule.registerQueue({
      name: 'spotifyMode',
    }),
    SpotifyModule,
  ],
  providers: [
    SpotifyModeService,
    SpotifyModeHostService,
    SpotifyModeResolver,
    SpotifyModeProcessor,
    SpotifyModeQueueService,
    SpotifyModeCurrentService,
  ],
  exports: [SpotifyModeService, SpotifyModeHostService],
})
export class SpotifyModeModule {}
