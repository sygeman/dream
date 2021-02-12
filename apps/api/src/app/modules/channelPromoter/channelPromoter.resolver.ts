import {
  Query,
  Resolver,
  Mutation,
  Subscription,
  Args,
  Context,
} from '@nestjs/graphql';
import { UseGuards, Inject } from '@nestjs/common';
import { AuthGuard } from '@dream/auth-api';
import { ChannelPromoterArgs } from './dto/channelPromoter.args';
import { CreateChannelPromoterArgs } from './dto/createChannelPromoter.args';
import { DeleteChannelPromoterArgs } from './dto/deleteChannelPromoter.args';
import { SetChannelPromoterActiveArgs } from './dto/setChannelPromoterActive.args';
import { SetChannelPromoterCostArgs } from './dto/setChannelPromoterCost.args';
import { TwitchService } from '../twitch/twitch.service';
import { WalletService } from '../wallet/wallet.service';
import { ChannelService } from '../channel/channel.service';
import { ChannelPromoterService } from '../channelPromoter/channelPromoter.service';
import { CurrencyType } from '../wallet/types/CurrencyType';
import { ChannelPromoter } from './models/channelPromoter';
import { ID } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { MoreThan } from 'typeorm';

@Resolver((of) => ChannelPromoter)
export class ChannelPromoterResolver {
  constructor(
    private readonly twitchService: TwitchService,
    private readonly walletService: WalletService,
    private readonly channelService: ChannelService,
    private readonly channelPromoterService: ChannelPromoterService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  @Query((returns) => ChannelPromoter)
  @UseGuards(AuthGuard)
  async channelPromoter(
    @Args() args: ChannelPromoterArgs,
    @Context('userId') userId
  ) {
    const { id } = args.where;

    const channelPromoter = await this.channelPromoterService.findOneById(id);

    if (userId !== channelPromoter.userId) {
      throw new Error('Deny');
    }

    return channelPromoter;
  }

  @Query((returns) => [ChannelPromoter])
  @UseGuards(AuthGuard)
  async channelPromoters(@Context('userId') userId: string) {
    const { nodes } = await this.channelPromoterService.findByUserId(userId);
    return nodes || [];
  }

  @Mutation((returns) => ChannelPromoter)
  @UseGuards(AuthGuard)
  async createChannelPromoter(
    @Args() args: CreateChannelPromoterArgs,
    @Context('userId') userId: string
  ) {
    const { channelName } = args;
    const twitchUser = await this.twitchService.user({ userName: channelName });

    if (!twitchUser) {
      throw new Error(`Streamer ${channelName} not found`);
    }

    const channel = await this.channelService.upsert(twitchUser.id, {
      name: twitchUser.login,
      avatar: twitchUser.profile_image_url,
    });

    if (!channel) {
      throw new Error('Create Channel Error');
    }

    const channelPromoter = await this.channelPromoterService.create({
      userId,
      channelId: twitchUser.id,
    });

    return channelPromoter;
  }

  @Mutation((returns) => ChannelPromoter)
  @UseGuards(AuthGuard)
  async deleteChannelPromoter(
    @Args() args: DeleteChannelPromoterArgs,
    @Context('userId') userId
  ) {
    const { id } = args;

    const channelPromoter = await this.channelPromoterService.findOneById(id);

    if (!channelPromoter) {
      throw new Error('ChannelPromoter not found');
    }

    if (channelPromoter.userId !== userId) {
      throw new Error('Deny');
    }

    await this.channelPromoterService.deleteById(id);

    return channelPromoter;
  }

  @Mutation((returns) => Boolean)
  @UseGuards(AuthGuard)
  async setChannelPromoterActive(
    @Args() args: SetChannelPromoterActiveArgs,
    @Context('userId') userId: string
  ) {
    const { id, active } = args;

    const walletBalanceNotZero = await this.walletService.findOne({
      where: { userId, currency: CurrencyType.real, balance: MoreThan(0) },
    });

    if (!walletBalanceNotZero && active) {
      throw new Error('Wallet Real Zero Balance');
    }

    const cPromoter = await this.channelPromoterService.findOneById(id);

    if (!cPromoter || cPromoter.userId !== userId) {
      throw new Error('Deny');
    }

    const channelPromoter = await this.channelPromoterService.updateById({
      id,
      data: { active },
    });

    if (!channelPromoter) {
      return false;
    }

    return true;
  }

  @Mutation((returns) => Boolean)
  @UseGuards(AuthGuard)
  async setChannelPromoterCost(
    @Args() args: SetChannelPromoterCostArgs,
    @Context('userId') userId: string
  ) {
    const { id, cost } = args;

    if (cost < 1 || cost > 50) {
      throw new Error('Invalid cost range');
    }

    const cPromoter = await this.channelPromoterService.findOneById(id);

    if (!cPromoter || cPromoter.userId !== userId) {
      throw new Error('Deny');
    }

    const channelPromoter = await this.channelPromoterService.updateById({
      id,
      data: { cost },
    });

    if (!channelPromoter) {
      return false;
    }

    return true;
  }

  @Subscription((returns) => ChannelPromoter, {
    name: 'channelPromoter',
    filter: ({ channelPromoter }, { id }) => channelPromoter.id === id,
  })
  channelPromoterUpdated(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.pubsub.asyncIterator('channelPromoter');
  }

  @Subscription((returns) => ChannelPromoter, {
    filter: ({ channelPromoterCreated }, variables, { userId }) =>
      userId && userId === channelPromoterCreated.userId,
  })
  channelPromoterCreated() {
    return this.pubsub.asyncIterator('channelPromoterCreated');
  }

  @Subscription((returns) => ChannelPromoter, {
    filter: ({ channelPromoterDeleted }, variables, { userId }) =>
      userId && userId === channelPromoterDeleted.userId,
  })
  channelPromoterDeleted() {
    return this.pubsub.asyncIterator('channelPromoterDeleted');
  }
}
