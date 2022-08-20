import {
  Args,
  Context,
  ID,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PrismaService } from '@dream/pepega-prisma';
import { ClipComment } from './models/clip-comment.model';
import { Inject, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@dream/pepega/auth/api';
import { ClipCommentCreateInput } from './dto/clip-comment.create.input';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { ClipService } from '@dream/pepega/clip/api';
import { UserRole } from '@prisma/pepega';

@Resolver(() => ClipComment)
export class ClipCommentResolver {
  constructor(
    private prisma: PrismaService,
    private clipService: ClipService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  @Query(() => [ClipComment])
  async clipComments(@Args({ name: 'clipId', type: () => ID }) clipId: string) {
    return await this.prisma.clipComment.findMany({
      where: { clipId },
      orderBy: { createdAt: 'asc' },
      include: { user: true },
      take: 100,
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async createClipComment(
    @Args('input') input: ClipCommentCreateInput,
    @Context('userId') userId: string
  ) {
    const { content, clipId } = input;

    const trimContent = content.trim();

    if (trimContent.length === 0) {
      throw new Error('Empty message');
    }

    if (trimContent.length > 500) {
      throw new Error('Too long message');
    }

    // Create Clip
    await this.clipService.clip(clipId);

    const clipCommentCreated = await this.prisma.clipComment.create({
      data: {
        clipId,
        content: trimContent,
        userId,
      },
      include: { user: true },
    });

    this.pubsub.publish('clipCommentCreated', { clipCommentCreated, clipId });

    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async removeClipComment(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Context('userId') userId: string
  ) {
    const comment = await this.prisma.clipComment.findUnique({ where: { id } });
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (user.role === UserRole.User && comment.userId !== userId) {
      throw 'Deny';
    }

    await this.prisma.clipComment.delete({ where: { id } });

    this.pubsub.publish('clipCommentRemoved', {
      clipCommentRemoved: id,
      clipId: comment?.clipId,
    });

    return true;
  }

  @Subscription(() => ClipComment, {
    filter: (payload, variables) => payload.clipId === variables.clipId,
  })
  clipCommentCreated(
    @Args({ name: 'clipId', type: () => ID })
    clipId: string
  ) {
    return this.pubsub.asyncIterator('clipCommentCreated');
  }

  @Subscription(() => ID, {
    filter: (payload, variables) => payload.clipId === variables.clipId,
  })
  clipCommentRemoved(
    @Args({ name: 'clipId', type: () => ID })
    clipId: string
  ) {
    return this.pubsub.asyncIterator('clipCommentRemoved');
  }
}
