import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@dream/pepega-prisma';
import { Clip } from './models/clip.model';

@Resolver(() => Clip)
export class ClipResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => Clip, { nullable: true })
  async clip(
    @Args({ name: 'id', type: () => ID, nullable: true })
    id: string
  ) {
    // find or create

    return this.prisma.clip.findFirst({ where: { id } });
  }

  @Query(() => [Clip], { nullable: true })
  // clips(orderBy: createdAt|score, period: day|week|month|all)
  async clips() {
    // find or create
    return this.prisma.clip.findMany({ orderBy: { score: 'desc' } });
  }
}
