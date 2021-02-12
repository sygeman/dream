import { UseGuards, Inject } from '@nestjs/common';
import {
  Mutation,
  Query,
  Resolver,
  Subscription,
  Args,
  Context,
} from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { ID } from '@nestjs/graphql';

import { AuthGuard, ModGuard } from '@dream/auth-api';
import { ClipCommentService } from './clipComment.service';
import { ClipService } from '../clip/clip.service';
import { ClipComment } from './models/clipComment';
import { ClipCommentCreateInput } from './dto/clipComment.create.input';

@Resolver((of) => ClipComment)
export class ClipCommentResolver {
  constructor(
    private readonly clipService: ClipService,
    private readonly clipCommentService: ClipCommentService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  @Query((returns) => ClipComment)
  async clipComment(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.clipCommentService.findOne({
      where: { id, deleted: false },
      relations: ['author'],
    });
  }

  @Query((returns) => [ClipComment])
  async clipComments(
    @Args({ name: 'clipId', type: () => ID, nullable: true }) clipId: string
  ) {
    return await this.clipCommentService.find({
      where: {
        clipId,
        deleted: false,
      },
      order: {
        createdAt: 'ASC',
      },
      relations: ['author'],
      take: 100,
    });
  }

  @Mutation((returns) => Boolean)
  @UseGuards(AuthGuard)
  async createClipComment(
    @Args('input') input: ClipCommentCreateInput,
    @Context('userId') userId: string
  ) {
    let { content, clipId } = input;

    content = content.trim();

    if (content.length === 0) {
      throw new Error('Empty message');
    }

    if (content.length > 500) {
      throw new Error('Too long message');
    }

    // Create Clip
    await this.clipService.getById(clipId);

    const clipComment = await this.clipCommentService.create({
      clipId,
      content,
      authorId: userId,
    });

    const clipCommentCreated = await this.clipCommentService.findOne({
      where: { id: clipComment.id },
      relations: ['author'],
    });

    this.pubsub.publish('clipCommentCreated', {
      clipCommentCreated,
      clipId,
    });

    return true;
  }

  @Mutation((returns) => Boolean)
  @UseGuards(AuthGuard, ModGuard)
  async removeClipComment(@Args({ name: 'id', type: () => ID }) id: string) {
    const comment = await this.clipCommentService.findOne({ where: { id } });

    if (!comment) {
      throw new Error('The comment not found');
    }

    await this.clipCommentService.update({ id }, { deleted: true });

    this.pubsub.publish('clipCommentRemoved', {
      clipCommentRemoved: id,
      clipId: comment.clipId,
    });

    return true;
  }

  @Subscription((returns) => ClipComment, {
    filter: (payload, variables) => payload.clipId === variables.clipId,
  })
  clipCommentCreated(
    @Args({ name: 'clipId', type: () => ID })
    clipId: string
  ) {
    return this.pubsub.asyncIterator('clipCommentCreated');
  }

  @Subscription((returns) => ID, {
    filter: (payload, variables) => payload.clipId === variables.clipId,
  })
  clipCommentRemoved(
    @Args({ name: 'clipId', type: () => ID })
    clipId: string
  ) {
    return this.pubsub.asyncIterator('clipCommentRemoved');
  }
}
