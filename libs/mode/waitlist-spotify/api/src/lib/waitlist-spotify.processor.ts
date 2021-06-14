import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { WaitlistSpotifyService } from './waitlist-spotify.service';

@Processor('waitlistSpotify')
export class WaitlistSpotifyProcessor {
  private readonly logger = new Logger(WaitlistSpotifyProcessor.name);

  constructor(
    private readonly waitlistSpotifyService: WaitlistSpotifyService
  ) {}

  @Process('skip')
  skip({ data: { itemId } }: Job<{ itemId: string }>) {
    this.logger.log(`waitlistSpotifySkip ${itemId}`);
    return this.waitlistSpotifyService.skipTrackByQueue(itemId);
  }
}
