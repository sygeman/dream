import { PrismaService } from '@dream/prisma';
import { SpotifyService } from '@dream/external-api/spotify';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { SpotifyModeCurrentService } from './current.service';

@Injectable()
export class SpotifyModeQueueService {
  private readonly logger = new Logger(SpotifyModeQueueService.name);

  constructor(
    private prisma: PrismaService,
    private spotify: SpotifyService,
    private currentService: SpotifyModeCurrentService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  async add({
    channelId,
    trackId,
    userId,
    start = 0,
    end,
  }: {
    channelId: string;
    trackId: string;
    userId: string;
    start?: number;
    end?: number;
  }) {
    this.logger.log('addTrackToQueue');
    const track = await this.spotify.getFormatedTrack(trackId, userId);

    if (typeof end !== 'number') end = track.duration;

    const newItem = await this.prisma.spotifyModeItem.create({
      data: {
        duration: end - start,
        start,
        end,
        channel: {
          connect: { id: channelId },
        },
        author: {
          connect: { id: userId },
        },
        track: {
          connect: { id: track.id },
        },
      },
    });

    this.pubsub.publish('spotifyModeQueueUpdated', {
      channelId: newItem.channelId,
      spotifyModeQueueUpdated: true,
    });

    const spotifyModeIsEmpty = await this.prisma.spotifyMode.findFirst({
      where: { channelId, itemId: null },
    });

    if (spotifyModeIsEmpty) {
      return this.currentService.set({ channelId });
    }
  }

  remove() {
    this.logger.log('removeTrack');
    // Remove track from queue

    // this.pubsub.publish('spotifyModeQueueUpdated', {
    //   channelName: spotifyModeUpdated.channel.name,
    // });
  }
}
