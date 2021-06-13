import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { WaitlistYoutubeService } from './waitlist-youtube.service';

@Processor('waitlistYoutube')
export class WaitlistYoutubeProcessor {
  private readonly logger = new Logger(WaitlistYoutubeProcessor.name);

  constructor(
    private readonly waitlistYoutubeService: WaitlistYoutubeService
  ) {}

  @Process('skip')
  skip({ data: { itemId } }: Job<{ itemId: string }>) {
    this.logger.log(`waitlistYoutubeSkip ${itemId}`);
    return this.waitlistYoutubeService.skipVideoByQueue(itemId);
  }
}
