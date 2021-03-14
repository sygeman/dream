import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { WaitlistSpotifyService } from './waitlist-spotify.service';

@Processor('waitlistSpotify')
export class WaitlistSpotifyProcessor {
  constructor(
    private readonly waitlistSpotifyService: WaitlistSpotifyService
  ) {}

  @Process('skip')
  skip({ data: { playkey } }: Job<{ playkey: string }>) {
    Logger.log(`waitlistSpotifySkip ${playkey}`);
    return this.waitlistSpotifyService.skipTrackByQueue(playkey);
  }
}
