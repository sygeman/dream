import { PrismaService } from '@dream/prisma';
import { Injectable, Logger } from '@nestjs/common';
import * as ms from 'ms';

@Injectable()
export class ModeWaitlistService {
  constructor(private prisma: PrismaService) {}

  setTrack() {
    Logger.log('setTrack');
    // Cut first track from queue
    // Set this track to waitlistMode state
    // Create new skip process
  }

  addTrack() {
    Logger.log('addTrack');
    // Add track to queue
    // If current is empty this.setTrack()
  }

  removeTrack() {
    Logger.log('removeTrack');
    // Remove track from queue
  }

  skipTrack() {
    Logger.log('skipTrack');
    // Cancel current skip process
    // Set next track from queue
  }
}
