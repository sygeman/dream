import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@dream/pepega/auth/api';
import { PrismaService } from '@dream/pepega-prisma';
import { ClipScore } from './models/clip-score.model';
import { Logger, UseGuards } from '@nestjs/common';
import { ClipService } from '@dream/pepega/clip/api';
import { UserCoinService } from '@dream/pepega/user-coin/api';

const CHANGE_SCORE_COST = 10;

@Resolver(() => ClipScore)
export class ClipScoreResolver {
  private readonly logger = new Logger(ClipScoreResolver.name);

  constructor(
    private prisma: PrismaService,
    private clipService: ClipService,
    private userCoinService: UserCoinService
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async increaseClipScore(
    @Args({ name: 'clipId', type: () => String })
    clipId: string,
    @Context('userId') userId: string
  ) {
    this.logger.log(`increaseClipScore - ${clipId}`);
    const clip = await this.clipService.clip(clipId);

    await this.userCoinService.decrease(userId, CHANGE_SCORE_COST);

    await this.prisma.clip.update({
      where: { id: clip.id },
      data: { score: { increment: CHANGE_SCORE_COST } },
    });

    return true;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async decreaseClipScore(
    @Args({ name: 'clipId', type: () => String })
    clipId: string,
    @Context('userId') userId: string
  ) {
    this.logger.log(`decreaseClipScore - ${clipId}`);
    const clip = await this.clipService.clip(clipId);

    await this.userCoinService.decrease(userId, CHANGE_SCORE_COST);

    await this.prisma.clip.update({
      where: { id: clip.id },
      data: { score: { decrement: 10 } },
    });
    return true;
  }
}
