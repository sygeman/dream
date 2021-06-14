import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { PrismaModule } from '@dream/prisma';
import { YoutubeModule } from '@dream/external-api/youtube';
import { WaitlistYoutubeResolver } from './waitlist-youtube.resolver';
import { WaitlistYoutubeProcessor } from './waitlist-youtube.processor';
import { WaitlistYoutubeService } from './waitlist-youtube.service';

@Module({
  imports: [
    PrismaModule,
    BullModule.registerQueue({
      name: 'waitlistYoutube',
    }),
    YoutubeModule,
    // SpotifyModule,
  ],
  providers: [
    WaitlistYoutubeService,
    WaitlistYoutubeResolver,
    WaitlistYoutubeProcessor,
  ],
  exports: [WaitlistYoutubeService],
})
export class WaitlistYoutubeModule {}
