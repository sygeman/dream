import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@dream/pepega-prisma';
import { ClipHistory } from './models/clip-history.model';

@Resolver(() => ClipHistory)
export class ClipHistoryResolver {
  constructor(private prisma: PrismaService) {}

  // clipsHistory(userId)
}
