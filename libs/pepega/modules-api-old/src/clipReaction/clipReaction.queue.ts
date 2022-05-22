import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Processor, Process } from '@nestjs/bull';

import { ClipReaction } from './clipReaction.entity';
import { ClipReactionStats } from './clipReactionStats.entity';
import { ClipReactionType } from './types/ClipReactionType';
import { ClipService } from '../clip/clip.service';

@Processor()
export class ClipReactionQueue {
  constructor(
    @InjectRepository(ClipReaction)
    private readonly clipReactionRepository: Repository<ClipReaction>,
    @InjectRepository(ClipReactionStats)
    private readonly clipReactionsRepository: Repository<ClipReactionStats>,
    private readonly clipService: ClipService // ? forward
  ) {}

  @Process({ name: 'recalcClipStats' })
  async recalcClipStats(job) {
    const { clipId } = job.data;

    // TODO: qb 1 query
    const [likes, dislikes] = await Promise.all([
      this.clipReactionRepository.count({
        where: { clipId, type: ClipReactionType.like }
      }),
      this.clipReactionRepository.count({
        where: { clipId, type: ClipReactionType.dislike }
      })
    ]);

    const rating = likes - dislikes;

    let clipStats = await this.clipReactionsRepository.findOne({
      where: { clipId }
    });

    if (!clipStats) {
      clipStats = new ClipReactionStats();
      clipStats.clipId = clipId;
    }

    clipStats.likes = likes;
    clipStats.dislikes = dislikes;
    clipStats.rating = rating;

    return this.clipReactionsRepository.save(clipStats);
  }

  @Process({ name: 'setClipReaction' })
  async setClipReaction(job) {
    const { clipId, userId, type } = job.data;

    let reaction = await this.clipReactionRepository.findOne({
      where: { clipId, userId }
    });

    let oldReactionType = ClipReactionType.none;

    if (!reaction) {
      if (type === ClipReactionType.none) {
        return false;
      }

      // Create Clip
      await this.clipService.getById(clipId);

      reaction = new ClipReaction();
      reaction.clipId = clipId;
      reaction.userId = userId;
    } else {
      oldReactionType = reaction.type;

      if (type === oldReactionType) {
        return false;
      }
    }

    reaction.type = type;

    return this.clipReactionRepository.save(reaction);
  }
}
