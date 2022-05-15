import { PrismaService } from '@dream/prisma/mono';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as ms from 'ms';

@Injectable()
export class ConnectionService {
  constructor(
    private readonly config: ConfigService,
    private prisma: PrismaService
  ) {}

  async cleanup() {
    return await this.prisma.connection.deleteMany({
      where: {
        updatedAt: {
          lt: new Date(new Date().getTime() - ms('7s')),
        },
      },
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
        where: { name: channel, community: { name: community } },
      });

      if (channelData) {
        channelId = channelData.id;
      }
    }

    try {
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
    } catch (error) {
      Logger.error(error);
    }
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
