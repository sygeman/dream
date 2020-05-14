import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  FindOneOptions,
  FindManyOptions,
  FindConditions,
} from 'typeorm';

import { ClipHistory } from './clipHistory.entity';

import { ClipService } from '../clip/clip.service';

@Injectable()
export class ClipHistoryService {
  constructor(
    @InjectRepository(ClipHistory)
    private readonly clipHistoryRepository: Repository<ClipHistory>,
    private readonly clipService: ClipService,
  ) {}

  async setHistory(clipId: string, userId: string) {
    let history = await this.clipHistoryRepository.findOne({
      where: { clipId, userId },
    });

    if (!history) {
      await this.clipService.getById(clipId);

      history = new ClipHistory();
      history.clipId = clipId;
      history.userId = userId;

      return this.clipHistoryRepository.save(history);
    }

    return this.clipHistoryRepository.increment({ id: history.id }, 'count', 1);
  }

  async count(findOptions: FindOneOptions<ClipHistory>) {
    return await this.clipHistoryRepository.count(findOptions);
  }

  async findOne(findOptions: FindOneOptions<ClipHistory>) {
    return await this.clipHistoryRepository.findOne(findOptions);
  }

  async find(findOptions: FindManyOptions<ClipHistory>) {
    return await this.clipHistoryRepository.find(findOptions);
  }

  async create(commentPayload) {
    const newComment = new ClipHistory();

    Object.keys(commentPayload).forEach(key => {
      newComment[key] = commentPayload[key];
    });

    return this.clipHistoryRepository.save(newComment);
  }

  async remove(findOptions: FindConditions<ClipHistory>) {
    return this.clipHistoryRepository.delete(findOptions);
  }

  async update(findOptions: FindConditions<ClipHistory>, data: any) {
    return this.clipHistoryRepository.update(findOptions, data);
  }
}
