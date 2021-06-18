import { PrismaService } from '@dream/prisma';
import { SpotifyService } from '@dream/external-api/spotify';
import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Injectable()
export class TwitchStreamService {
  private readonly logger = new Logger(TwitchStreamService.name);

  constructor(
    private prisma: PrismaService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  async init(channelId: string) {
    const twitchStream = await this.prisma.modeTwitchStream.findFirst({
      where: { channelId },
    });

    if (twitchStream) return twitchStream;

    return this.prisma.modeTwitchStream.create({
      data: {
        channel: { connect: { id: channelId } },
      },
    });
  }

  async update({
    channelId,
    channelKey,
  }: {
    channelId: string;
    channelKey?: string;
  }) {
    const twitchStream = await this.init(channelId);

    return await this.prisma.modeTwitchStream.update({
      where: { id: twitchStream.id },
      data: { channelKey: channelKey },
    });
  }
}
