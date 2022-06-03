import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@dream/pepega-prisma';
import { Clip } from './models/clip.model';
import { Clips } from './models/clips.model';
import { ClipsInput } from './dto/clips.input';

@Resolver(() => Clip)
export class ClipResolver {
  constructor(private prisma: PrismaService) {}

  @ResolveField()
  async sourceUrl(@Parent() clip: Clip) {
    return clip.thumbnail_url.replace(/\-\bpreview\-\b.+/, '.mp4');
  }

  @Query(() => Clip, { nullable: true })
  async clip(
    @Args({ name: 'id', type: () => String })
    id: string
  ) {
    // find or create

    return this.prisma.clip.findFirst({ where: { id } });
  }

  @Query(() => Clips)
  // clips(orderBy: createdAt|score, period: day|week|month|all)
  async clips(
    @Args({ name: 'input', type: () => ClipsInput })
    input: ClipsInput
  ) {
    const clips = await this.prisma.clip.findMany({
      skip: input?.cursor ? 1 : 0,
      cursor: input.cursor ? { id: input.cursor } : undefined,
      orderBy: { score: 'desc' },
      take: 30,
    });

    const clipsCount = clips.length;
    const cursor = clipsCount > 0 ? clips[clipsCount - 1]?.id : null;

    return { clips, cursor };
  }
}
