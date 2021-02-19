import { PrismaService } from '@dream/prisma';
import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { interval } from 'rxjs';
import * as ms from 'ms';

@Injectable()
export class ConnectionService implements OnApplicationBootstrap {
  constructor(
    private readonly config: ConfigService,
    private prisma: PrismaService
  ) {}

  onApplicationBootstrap() {
    this.initConnectionWatcher();
  }

  async initConnectionWatcher() {
    interval(ms('5s')).subscribe(async () => {
      return await this.prisma.connection.deleteMany({
        where: {
          updatedAt: {
            lt: new Date(new Date().getTime() - ms('7s')),
          },
        },
      });
    });
  }

  async updateConnectionStatus({
    connectionId,
    ipHash,
    userId,
    community,
    channel,
  }) {
    const instanceId = this.config.get('base.instanceId');

    let channelId = null;

    if (channel) {
      const channelData = await this.prisma.channel.findFirst({
        where: { name: channel, Community: { name: community } },
      });

      if (channelData) {
        channelId = channelData.id;
      }
    }

    await this.prisma.connection.upsert({
      where: {
        id: connectionId,
      },
      create: {
        id: connectionId,
        ipHash,
        instanceId,
        userId,
        channelId,
      },
      update: {
        channelId,
        updatedAt: new Date(),
      },
    });
  }

  async remove(id: string) {
    return this.prisma.connection.deleteMany({ where: { id } });
  }

  async uniqCount() {
    const connections = await this.prisma.connection.findMany({
      select: { ipHash: true },
      distinct: ['ipHash'],
    });

    return connections.length;
  }
}
