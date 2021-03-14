import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { PrismaModule } from '@dream/prisma';
import { WaitlistSpotifyResolver } from './waitlist-spotify.resolver';
import { WaitlistSpotifyProcessor } from './waitlist-spotify.processor';
import { WaitlistSpotifyService } from './waitlist-spotify.service';

@Module({
  imports: [
    PrismaModule,
    BullModule.registerQueue({
      name: 'waitlistSpotify',
    }),
  ],
  providers: [
    WaitlistSpotifyService,
    WaitlistSpotifyResolver,
    WaitlistSpotifyProcessor,
  ],
  exports: [WaitlistSpotifyService],
})
export class WaitlistSpotifyModule {}
