import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@dream/pepega/auth/api';
import { PrismaService } from '@dream/pepega-prisma';
import { ClipHistory } from './models/clip-history.model';
import { Logger, UseGuards } from '@nestjs/common';
import { ClipService } from '@dream/pepega/clip/api';
import { UserCoinService } from '@dream/pepega/user-coin/api';

const CLIP_HISTORY_REWARD = 5;

@Resolver(() => ClipHistory)
export class ClipHistoryResolver {
  private readonly logger = new Logger(ClipHistoryResolver.name);

  constructor(
    private prisma: PrismaService,
    private clipService: ClipService,
    private userCoinService: UserCoinService
  ) {}

  // clipsHistory(userId)

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async setClipHistory(
    @Args({ name: 'clipId', type: () => String })
    clipId: string,
    @Context('userId') userId: string
  ) {
    this.logger.log(`setClipHistory - ${clipId}`);
    await this.clipService.clip(clipId);

    const clipHistory = await this.prisma.clipHistory.findFirst({
      where: { clipId, userId },
    });

    if (!clipHistory) {
      await this.prisma.clipHistory.create({
        data: { userId, clipId, count: 1 },
      });
      await this.userCoinService.increase(userId, CLIP_HISTORY_REWARD);
      return true;
    }

    await this.prisma.clipHistory.update({
      where: { id: clipHistory.id },
      data: { count: { increment: 1 } },
    });

    return true;
  }
}
