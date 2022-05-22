import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@dream/pepega-prisma';
import { UserCoin } from './models/user-coin.model';

@Resolver(() => UserCoin)
export class UserCoinResolver {
  constructor(private prisma: PrismaService) {}

  // increaseUserCoins(userId, count?)
  // decreaseUserCoins(userId, count?)
}
