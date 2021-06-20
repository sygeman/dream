import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { PrismaModule } from '@dream/prisma';
import { SpotifyModule } from '@dream/external-api/spotify';
import { SpotifyModeResolver } from './spotify-mode.resolver';
import { SpotifyModeProcessor } from './spotify-mode.processor';
import { SpotifyModeService } from './spotify-mode.service';

@Module({
  imports: [
    PrismaModule,
    BullModule.registerQueue({
      name: 'spotifyMode',
    }),
    SpotifyModule,
  ],
  providers: [SpotifyModeService, SpotifyModeResolver, SpotifyModeProcessor],
  exports: [SpotifyModeService],
})
export class SpotifyModeModule {}
