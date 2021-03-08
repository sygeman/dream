import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { ModeWaitlistService } from './mode-waitlist.service';

@Processor('modeWaitlist')
export class ModeWaitlistProcessor {
  constructor(private readonly modeWaitlistService: ModeWaitlistService) {}

  @Process('modeWaitlistSkip')
  modeWaitlistSkip({ data: { playkey } }: Job<{ playkey: string }>) {
    Logger.log(`modeWaitlistSkip ${playkey}`);
    return this.modeWaitlistService.skipTrackByQueue(playkey);
  }
}
