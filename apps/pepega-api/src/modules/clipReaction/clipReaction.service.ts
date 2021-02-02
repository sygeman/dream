import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import { ClipReaction } from './clipReaction.entity';
import { ClipReactionStats } from './clipReactionStats.entity';

import { ClipReactionType } from './types/ClipReactionType';

interface IReactionPayload {
  clipId: string;
  userId: string;
  type: ClipReactionType;
}

@Injectable()
export class ClipReactionService {
  constructor(
    @InjectQueue() readonly appQueue: Queue,
    @InjectRepository(ClipReaction)
    private readonly clipReactionRepository: Repository<ClipReaction>,
    @InjectRepository(ClipReactionStats)
    private readonly clipReactionsRepository: Repository<ClipReactionStats>
  ) {}

  async get(clipId: string, userId: string) {
    return this.clipReactionRepository.findOne({ where: { clipId, userId } });
  }

  async getStats(clipId: string) {
    return this.clipReactionsRepository.findOne({ where: { clipId } });
  }

  async set(reactionPayload: IReactionPayload) {
    return this.appQueue.add('setClipReaction', reactionPayload);
  }

  async recalcStats(clipId: string) {
    return this.appQueue.add('recalcClipStats', { clipId });
  }

  async createStats(clipId: string) {
    const clipStats = new ClipReactionStats();
    clipStats.clipId = clipId;

    return this.clipReactionsRepository.save(clipStats);
  }
}
