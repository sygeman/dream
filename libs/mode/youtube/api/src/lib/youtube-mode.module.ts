import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { PrismaModule } from '@dream/prisma';
import { YoutubeModule } from '@dream/external-api/youtube';
import { WaitlistYoutubeResolver } from './youtube-mode.resolver';
import { WaitlistYoutubeProcessor } from './youtube-mode.processor';
import { WaitlistYoutubeService } from './youtube-mode.service';

@Module({
  imports: [
    PrismaModule,
    BullModule.registerQueue({
      name: 'waitlistYoutube',
    }),
    YoutubeModule,
  ],
  providers: [
    WaitlistYoutubeService,
    WaitlistYoutubeResolver,
    WaitlistYoutubeProcessor,
  ],
  exports: [WaitlistYoutubeService],
})
export class YoutubeModeModule {}
