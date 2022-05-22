import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@dream/pepega-prisma';
import { ClipComment } from './models/clip-comment.model';

@Resolver(() => ClipComment)
export class ClipCommentResolver {
  constructor(private prisma: PrismaService) {}

  // clipComments(clipId)
  // createClipComment(clipId)
}
