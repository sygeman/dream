import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@dream/pepega/auth/api';
import { PrismaService } from '@dream/pepega-prisma';
import { ClipScore } from './models/clip-score.model';
import { UseGuards } from '@nestjs/common';
import { ClipService } from '@dream/pepega/clip/api';

@Resolver(() => ClipScore)
export class ClipScoreResolver {
  constructor(
    private prisma: PrismaService,
    private clipService: ClipService
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async increaseClipScore(
    @Args({ name: 'clipId', type: () => String })
    clipId: string
  ) {
    // get clip
    console.log('increaseClipScore', clipId);
    const clip = await this.clipService.clip(clipId);
    await this.prisma.clip.update({
      where: { id: clip.id },
      data: { score: { increment: 10 } },
    });
    console.log(clip);
    return true;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async decreaseClipScore(
    @Args({ name: 'clipId', type: () => String })
    clipId: string
  ) {
    console.log('decreaseClipScore', clipId);
    return true;
  }
}
