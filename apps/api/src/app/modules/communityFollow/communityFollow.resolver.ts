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

import { AuthGuard } from '@dream/auth-api';

import { CommunityFollow } from './models/communityFollow';
import { SetCommunityFollowInput } from './dto/communityFollow.set.input';

import { CommunityFollowService } from '../communityFollow/communityFollow.service';

@Resolver((of) => CommunityFollow)
export class CommunityFollowResolver {
  constructor(
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub,
    private readonly communityFollowService: CommunityFollowService
  ) {}

  @Query((returns) => Int)
  async communityFollowsCount(
    @Args({ name: 'communityId', type: () => ID })
    communityId: string
  ) {
    return this.communityFollowService.count({
      where: { communityId, follow: true },
    });
  }

  @Query((returns) => CommunityFollow, { nullable: true })
  async communityFollow(
    @Args({ name: 'communityId', type: () => ID })
    communityId: string,
    @Args({ name: 'userId', type: () => ID, nullable: true })
    userId: string,
    @Context('userId') currentUserId
  ) {
    return await this.communityFollowService.findOne({
      where: { communityId, userId: userId || currentUserId },
    });
  }

  @Mutation((returns) => CommunityFollow)
  @UseGuards(AuthGuard)
  async setCommunityFollow(
    @Args('input') input: SetCommunityFollowInput,
    @Context('userId') userId
  ) {
    if (input.userId && input.userId !== userId) {
      throw new Error('Deny');
    }

    const where = {
      communityId: input.communityId,
      userId: input.userId || userId,
    };
    const communityFollowCount = await this.communityFollowService.count({
      where,
    });

    if (communityFollowCount > 0) {
      return this.communityFollowService.update(where, {
        follow: input.follow,
      });
    }

    return this.communityFollowService.create({
      ...where,
      follow: input.follow,
    });
  }

  @Subscription((returns) => CommunityFollow, {
    name: 'communityFollow',
    filter: ({ communityFollow }, { communityId }, { userId }) =>
      userId &&
      userId === communityFollow.userId &&
      communityId === communityFollow.communityId,
  })
  communityFollowUpdated(
    @Args({ name: 'communityId', type: () => ID })
    communityId: string,
    @Context('userId') userId: string
  ) {
    return this.pubsub.asyncIterator('communityFollow');
  }
}
