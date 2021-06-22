import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { SpotifyModeService } from './spotify-mode.service';
import { SpotifyModeHostService } from './host.service';

@Processor('spotifyMode')
export class SpotifyModeProcessor {
  private readonly logger = new Logger(SpotifyModeProcessor.name);

  constructor(
    private readonly spotifyModeService: SpotifyModeService,
    private readonly spotifyModeHostService: SpotifyModeHostService
  ) {}

  @Process('skip')
  skip({ data: { itemId } }: Job<{ itemId: string }>) {
    this.logger.log(`spotifyModeSkip ${itemId}`);
    return this.spotifyModeService.skipTrackByQueue(itemId);
  }

  @Process('syncHost')
  syncHost() {
    return this.spotifyModeHostService.syncHost();
  }
}
