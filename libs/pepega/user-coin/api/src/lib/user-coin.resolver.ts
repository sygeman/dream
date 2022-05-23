import { Context, Int, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PrismaService } from '@dream/pepega-prisma';
import { UserCoin } from './models/user-coin.model';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Inject } from '@nestjs/common';

@Resolver(() => UserCoin)
export class UserCoinResolver {
  constructor(
    private prisma: PrismaService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  @Query(() => Int)
  async userCoins(@Context('userId') userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { coins: true },
    });
    return user?.coins;
  }

  @Subscription((returns) => Int, {
    name: 'userCoinsUpdated',
    filter: (payload, _vars, { userId }) => userId && userId === payload.userId,
  })
  userCoinsUpdated(@Context('userId') userId: string) {
    return this.pubsub.asyncIterator('userCoinsUpdated');
  }

  // increaseUserCoins(userId, count?)
  // decreaseUserCoins(userId, count?)
}
