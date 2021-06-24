import { PrismaService } from '@dream/prisma';
import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Injectable()
export class SpotifyModeCurrentService {
  private readonly logger = new Logger(SpotifyModeCurrentService.name);

  constructor(
    private prisma: PrismaService,
    @InjectQueue('spotifyMode')
    private readonly spotifyModeQueue: Queue,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  async updateCurrentItem(id: string, itemId: string = null) {
    await this.prisma.spotifyMode.update({ where: { id }, data: { itemId } });
    return this.spotifyModeQueue.add('currentUpdated', { id });
  }

  async moveItemFromCurrentToHistory(id: string, skipped = false) {
    const updatedItem = await this.prisma.spotifyModeItem.update({
      where: { id },
      data: { endedAt: new Date(), skipped },
    });

    this.pubsub.publish('spotifyModeHistoryUpdated', {
      channelId: updatedItem.channelId,
      spotifyModeHistoryUpdated: true,
    });
  }

  async moveItemFromQueueToCurrent(id: string) {
    const updatedItem = await this.prisma.spotifyModeItem.update({
      where: { id },
      data: { startedAt: new Date() },
    });

    this.pubsub.publish('spotifyModeQueueUpdated', {
      channelId: updatedItem.channelId,
      spotifyModeQueueUpdated: true,
    });
  }

  async getFirstItemFromQueue(channelId: string) {
    return this.prisma.spotifyModeItem.findFirst({
      where: {
        channelId,
        startedAt: null,
        canceled: false,
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async set({ channelId, manualSkip = false }) {
    const spotifyMode = await this.prisma.spotifyMode.findFirst({
      where: { channelId },
    });

    if (spotifyMode?.itemId) {
      this.moveItemFromCurrentToHistory(spotifyMode?.itemId, manualSkip);
    }

    const firstItemFromQueue = await this.getFirstItemFromQueue(channelId);

    if (!firstItemFromQueue) {
      return this.updateCurrentItem(spotifyMode?.id);
    }

    this.moveItemFromQueueToCurrent(firstItemFromQueue.id);

    return this.updateCurrentItem(spotifyMode?.id, firstItemFromQueue.id);
  }

  async skipByQueue(itemId: string) {
    if (!itemId) return null;

    const spotifyMode = await this.prisma.spotifyMode.findFirst({
      where: { itemId },
    });

    if (spotifyMode) return this.set({ channelId: spotifyMode.channelId });
  }

  async skip({ channelId }) {
    return this.set({ channelId, manualSkip: true });
  }
}
