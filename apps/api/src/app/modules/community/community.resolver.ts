import { UseGuards, Inject } from '@nestjs/common';
import {
  Mutation,
  Query,
  Resolver,
  Subscription,
  Args,
  Context,
} from '@nestjs/graphql';
import { AuthGuard } from '@dream/auth-api';
import { CommunityService } from './community.service';
import { ChatService } from '../chat/chat.service';
import { WalletService } from '../wallet/wallet.service';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { ID } from '@nestjs/graphql';
import { Community } from './models/community';
import { CommunityCreateInput } from './dto/community.create.input';
import { CurrencyType } from '../wallet/types/CurrencyType';

@Resolver((of) => Community)
export class CommunityResolver {
  constructor(
    private readonly communityService: CommunityService,
    private readonly chatService: ChatService,
    private readonly walletService: WalletService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  @Query((returns) => Community)
  async community(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.communityService.findOne({ where: { id } });
  }

  @Query((returns) => [Community])
  async communities() {
    return await this.communityService.find({
      order: {
        createdAt: 'DESC',
      },
      take: 25,
    });
  }

  @Mutation((returns) => Community)
  @UseGuards(AuthGuard)
  async createCommunity(
    @Args('input') input: CommunityCreateInput,
    @Context('userId') userId: string
  ) {
    let { name, description, avatar } = input;

    name = name.trim();

    if (description) {
      description = description.trim();
    }

    if (avatar) {
      avatar = avatar.trim();
    }

    if (name.length === 0) {
      throw new Error('Empty name');
    }

    if (name.length > 100) {
      throw new Error('Too long name');
    }

    const costCreateCommunity = 100000;

    const { success } = await this.walletService.decrementBalance({
      userId,
      currency: CurrencyType.coin,
      amount: costCreateCommunity,
    });

    if (!success) {
      throw new Error('Insufficient funds');
    }

    try {
      const chat = await this.chatService.create({});

      return this.communityService.create({
        name,
        description,
        avatar,
        mainChatId: chat.id,
      });
    } catch (error) {
      await this.walletService.incrementBalance({
        userId,
        currency: CurrencyType.coin,
        amount: costCreateCommunity,
      });
    }
  }

  @Subscription((returns) => Community, {
    name: 'community',
    filter: ({ channel }, { id }) => channel.id === id,
  })
  communityUpdated(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.pubsub.asyncIterator('channel');
  }
}
