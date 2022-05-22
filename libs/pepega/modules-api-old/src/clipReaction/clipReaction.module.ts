import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClipReactionService } from './clipReaction.service';
import { ClipReactionResolver } from './clipReaction.resolver';
import { ClipReactionSubscriber } from './events/clipReaction';
import { ClipReactionsSubscriber } from './events/clipReactions';
import { ClipReactionQueue } from './clipReaction.queue';

import { ClipModule } from '../clip/clip.module';

import { ClipReaction } from './clipReaction.entity';
import { ClipReactionStats } from './clipReactionStats.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClipReaction, ClipReactionStats]),
    forwardRef(() => ClipModule),
  ],
  providers: [
    ClipReactionQueue,
    ClipReactionService,
    ClipReactionResolver,
    ClipReactionSubscriber,
    ClipReactionsSubscriber,
  ],
  exports: [ClipReactionService],
})
export class ClipReactionModule {}
