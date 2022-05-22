import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@dream/pepega-prisma';
import { ClipScore } from './models/clip-score.model';

@Resolver(() => ClipScore)
export class ClipScoreResolver {
  constructor(private prisma: PrismaService) {}

  // increaseClipScore(clipId, score?)
  // decreaseClipScore(clipId, score?)
}
