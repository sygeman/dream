import { Int, ID } from '@nestjs/graphql';
import { UseGuards, Inject } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import {
  Mutation,
  Query,
  Resolver,
  Subscription,
  Args,
  Context,
} from '@nestjs/graphql';

import { AuthGuard } from '../../guards';

import { CommunityClip } from './models/communityClip';
import { CommunityClipCreateInput } from './dto/communityClip.create.input';

import { ClipService } from '../clip/clip.service';
import { CommunityClipService } from './communityClip.service';
import { CommunityService } from '../community/community.service';
import { ClipReactionService } from '../clipReaction/clipReaction.service';
import { WalletService } from '../wallet/wallet.service';

import { UserRole } from '../user/types/UserRole';
import { ClipReactionType } from '../clipReaction/types/ClipReactionType';
import { CurrencyType } from '../wallet/types/CurrencyType';

@Resolver((of) => CommunityClip)
export class CommunityClipResolver {
  constructor(
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub,
    private readonly clipService: ClipService,
    private readonly communityService: CommunityService,
    private readonly clipReactionService: ClipReactionService,
    private readonly communityClipService: CommunityClipService,
    private readonly walletService: WalletService
  ) {}

  @Query((returns) => Int)
  async communityClipsCount() {
    return this.communityClipService.count({ where: { deleted: false } });
  }

  @Query((returns) => String, { nullable: true })
  async clipIdByPostId(
    @Args({ name: 'postId', type: () => ID }) postId: string
  ) {
    const communityClip = await this.communityClipService.findOne({
      where: { postId },
    });

    if (!communityClip) {
      throw new Error('CommunityClip not found');
    }

    return communityClip.clipId;
  }

  @Query((returns) => CommunityClip)
  async communityClip(
    @Args({ name: 'id', type: () => ID })
    id: string
  ) {
    return await this.communityClipService.findOne({
      where: { id, deleted: false },
    });
  }

  @Mutation((returns) => CommunityClip)
  @UseGuards(AuthGuard)
  async createCommunityClip(
    @Args('input') input: CommunityClipCreateInput,
    @Context('userId') userId
  ) {
    // get clip and community
    const [clip, community] = await Promise.all([
      this.clipService.getById(input.clipId),
      this.communityService.findOne({ where: { id: input.communityId } }),
    ]);

    // check rules
    // console.log({ input, clip, community });

    const duplicate = await this.communityClipService.findOne({
      where: { communityId: community.id, clipId: clip.id },
    });

    if (duplicate) {
      throw new Error('Duplicate');
    }

    const { success } = await this.walletService.decrementBalance({
      userId,
      currency: CurrencyType.coin,
      amount: community.costCreateClip,
    });

    if (!success) {
      throw new Error('Insufficient funds');
    }

    let communityClip;

    try {
      communityClip = await this.communityClipService.create({
        ...input,
        authorId: userId,
        title: input.title ? input.title : clip.title,
      });

      // set author default reaction
      this.clipReactionService.set({
        userId,
        clipId: clip.id,
        type: ClipReactionType.like,
      });
    } catch (error) {
      await this.walletService.incrementBalance({
        userId,
        currency: CurrencyType.coin,
        amount: community.costCreateClip,
      });
    }

    return communityClip;
  }

  @Mutation((returns) => Boolean)
  @UseGuards(AuthGuard)
  async removeCommunityClip(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Context('user') user
  ) {
    const communityClip = await this.communityClipService.findOne({
      where: { id },
    });

    if (!communityClip) {
      throw new Error('The clip not found');
    }

    if (
      user.role !== UserRole.admin &&
      user.role !== UserRole.mod &&
      user.id &&
      communityClip.authorId !== user.id
    ) {
      throw new Error('Deny');
    }

    await this.communityClipService.update({ id }, { deleted: true });

    return true;
  }

  @Subscription((returns) => CommunityClip, {
    name: 'communityClip',
    filter: ({ communityClip }, { id }) => communityClip.id === id,
  })
  communityClipUpdated(
    @Args({ name: 'id', type: () => ID })
    id: string
  ) {
    return this.pubsub.asyncIterator('communityClip');
  }
}
