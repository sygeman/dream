import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver, Args, Context } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';

import { AuthGuard } from '@dream/auth-api';
import { ClipHistoryService } from './clipHistory.service';
import { ClipHistory } from './models/clipHistory';

@Resolver((of) => ClipHistory)
export class ClipHistoryResolver {
  constructor(private readonly clipHistoryService: ClipHistoryService) {}

  @Mutation((returns) => Boolean)
  @UseGuards(AuthGuard)
  async setClipHistory(
    @Args({ name: 'clipId', type: () => ID }) clipId: string,
    @Context('userId') userId: string
  ) {
    await this.clipHistoryService.setHistory(clipId, userId);
    return true;
  }
}
