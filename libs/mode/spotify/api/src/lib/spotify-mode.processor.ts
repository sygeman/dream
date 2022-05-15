import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Inject, Logger } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { SpotifyModeHostService } from './services/host.service';
import { PrismaService } from '@dream/prisma/mono';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { SpotifyModeCurrentService } from './services/current.service';

@Processor('spotifyMode')
export class SpotifyModeProcessor {
  private readonly logger = new Logger(SpotifyModeProcessor.name);

  constructor(
    private prisma: PrismaService,
    private readonly currentService: SpotifyModeCurrentService,
    private readonly spotifyModeHostService: SpotifyModeHostService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub,
    @InjectQueue('spotifyMode')
    private readonly spotifyModeQueue: Queue
  ) {}

  @Process('skip')
  skip({ data: { itemId } }: Job<{ itemId: string }>) {
    this.logger.log(`spotifyModeSkip ${itemId}`);
    return this.currentService.skipByQueue(itemId);
  }

  @Process('syncHost')
  syncHost() {
    return this.spotifyModeHostService.syncHost();
  }

  @Process('currentUpdated')
  async currentUpdated({ data: { id } }: Job<{ id: string }>) {
    const spotifyMode = await this.prisma.spotifyMode.findUnique({
      where: { id },
      include: { item: { include: { track: true } } },
    });

    if (spotifyMode.item) {
      this.spotifyModeQueue.add(
        `skip`,
        { itemId: spotifyMode.item.id },
        {
          delay: spotifyMode.item.duration,
          removeOnComplete: true,
          removeOnFail: true,
        }
      );
    }

    this.pubsub.publish('spotifyModeCurrentUpdated', {
      channelId: spotifyMode.channelId,
      spotifyModeCurrentUpdated: true,
    });

    const track = spotifyMode?.item?.track;
    const state = track ? `${track?.artists} - ${track?.title}` : null;

    return this.prisma.channel.update({
      where: { id: spotifyMode.channelId },
      data: { state },
    });
  }
}
