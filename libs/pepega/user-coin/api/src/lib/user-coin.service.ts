import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@dream/pepega-prisma';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Injectable()
export class UserCoinService {
  private readonly logger = new Logger(UserCoinService.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  async increase(userId: string, count: number) {
    this.logger.log(`increase user score ${userId} - ${count}`);

    const userUpdated = await this.prisma.user.update({
      where: { id: userId },
      data: { coins: { increment: count } },
    });

    this.pubsub.publish('userCoinsUpdated', {
      userId,
      userCoinsUpdated: userUpdated.coins,
    });
  }

  async decrease(userId: string, count: number) {
    this.logger.log(`decrease user score ${userId} - ${count}`);

    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (user.coins < count) {
      throw 'Not enough coins';
    }

    const userUpdated = await this.prisma.user.update({
      where: { id: userId },
      data: { coins: { decrement: count } },
    });

    this.pubsub.publish('userCoinsUpdated', {
      userId,
      userCoinsUpdated: userUpdated.coins,
    });
  }
}
