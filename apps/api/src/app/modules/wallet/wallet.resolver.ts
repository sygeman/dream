import { UseGuards, Inject } from '@nestjs/common';
import {
  Query,
  Resolver,
  Args,
  Context,
  Subscription,
  Mutation,
} from '@nestjs/graphql';
import { AuthGuard, AdminGuard } from '@dream/auth-api';
import { WalletService } from './wallet.service';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { WalletArgs } from './dto/wallet.args';
import { Wallet } from './models/wallet';
import { ID, Int } from '@nestjs/graphql';
import { CurrencyType } from './types/CurrencyType';

@Resolver((of) => Wallet)
export class WalletResolvers {
  constructor(
    private readonly walletService: WalletService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  @Query((returns) => Wallet)
  @UseGuards(AuthGuard)
  async wallet(@Args() args: WalletArgs, @Context('userId') userId: string) {
    if (!args.where.userId) {
      args.where.userId = userId;
    }

    const wallet = await this.walletService.findOne({ where: args.where });

    if (!wallet) {
      return null;
    }

    if (wallet.userId !== userId) {
      throw new Error('Deny');
    }

    return wallet;
  }

  @Mutation((returns) => Boolean)
  @UseGuards(AuthGuard, AdminGuard)
  async walletIncrementBalance(
    @Args({ name: 'walletId', type: () => ID, nullable: true })
    walletId: string,
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @Args({ name: 'userId', type: () => ID, nullable: true }) userId: string,
    @Args({ name: 'currency', type: () => CurrencyType, nullable: true })
    currency: CurrencyType
  ) {
    await this.walletService.incrementBalance({
      walletId,
      amount,
      userId,
      currency,
    });
    return true;
  }

  @Mutation((returns) => Boolean)
  @UseGuards(AuthGuard, AdminGuard)
  async walletDecrementBalance(
    @Args({ name: 'walletId', type: () => ID, nullable: true })
    walletId: string,
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @Args({ name: 'userId', type: () => ID, nullable: true }) userId: string,
    @Args({ name: 'currency', type: () => CurrencyType, nullable: true })
    currency: CurrencyType
  ) {
    await this.walletService.decrementBalance({
      walletId,
      amount,
      userId,
      currency,
    });
    return true;
  }

  @Subscription((returns) => Wallet, {
    name: 'wallet',
    filter: ({ wallet }, { id }, { userId }) =>
      userId && userId === wallet.userId && id === wallet.id,
  })
  walletUpdated(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Context('userId') userId: string
  ) {
    return this.pubsub.asyncIterator('wallet');
  }
}
