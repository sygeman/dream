import { PrismaService } from '@dream/prisma';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { interval } from 'rxjs';
import * as ms from 'ms';

@Injectable()
export class ConnectionService implements OnModuleInit {
  constructor(
    private readonly config: ConfigService,
    private prisma: PrismaService
  ) {}

  onModuleInit() {
    this.initInstance();
    this.initInstanceWatcher();
  }

  upInstance = async () => {
    const id = this.config.get('base.instanceId');

    return this.prisma.instance.upsert({
      where: { id },
      create: { id },
      update: { updatedAt: new Date() },
    });
  };

  async killInstance(instanceId: string) {
    await this.prisma.connection.deleteMany({ where: { instanceId } });
    return this.prisma.instance.delete({ where: { id: instanceId } });
  }

  async initInstance() {
    await this.upInstance();
    interval(ms('5s')).subscribe(this.upInstance);
  }

  async initInstanceWatcher() {
    interval(ms('10s')).subscribe(async () => {
      const instances = await this.prisma.instance.findMany({
        where: {
          updatedAt: {
            lt: new Date(new Date().getTime() - ms('10s')),
          },
        },
      });

      instances.forEach((instance) => this.killInstance(instance.id));
    });
  }

  async create({ userId, ipHash }: { userId?: string; ipHash: string }) {
    const instanceId = this.config.get('base.instanceId');

    if (userId) {
      return this.prisma.connection.create({
        data: {
          ipHash,
          user: {
            connect: { id: userId },
          },
          instance: {
            connect: { id: instanceId },
          },
        },
      });
    } else {
      return this.prisma.connection.create({
        data: {
          ipHash,
          instance: {
            connect: { id: instanceId },
          },
        },
      });
    }
  }

  async remove(id: string) {
    return this.prisma.connection.delete({ where: { id } });
  }

  async uniqCount() {
    const connections = await this.prisma.connection.findMany({
      select: { ipHash: true },
      distinct: ['ipHash'],
    });

    return connections.length;
  }
}
