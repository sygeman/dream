import { PrismaService } from '@dream/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TwitchModeService {
  constructor(private prisma: PrismaService) {}

  async init(channelId: string) {
    const twitchMode = await this.prisma.twitchMode.findFirst({
      where: { channelId },
    });

    if (twitchMode) return twitchMode;

    return this.prisma.twitchMode.create({
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
    const twitchMode = await this.init(channelId);

    return await this.prisma.twitchMode.update({
      where: { id: twitchMode.id },
      data: { channelKey: channelKey },
    });
  }
}
