import { Process, Processor } from '@nestjs/bull';
import { ModeWaitlistService } from './mode-waitlist.service';

@Processor('modeWaitlist')
export class ModeWaitlistProcessor {
  constructor(private readonly modeWaitlistService: ModeWaitlistService) {}

  @Process('modeWaitlistSkip')
  handleCleanup() {
    this.modeWaitlistService.skipTrack();
  }
}
