import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  FindOneOptions,
  FindManyOptions,
  FindConditions,
  DeepPartial,
} from 'typeorm';

import { ClipCollection } from './clipCollection.entity';
import { ClipCollectionClip } from './clipCollectionClip.entity';

import { ClipService } from '../clip/clip.service';

@Injectable()
export class ClipCollectionService {
  constructor(
    @InjectRepository(ClipCollection)
    private readonly clipCollectionRepository: Repository<ClipCollection>,
    @InjectRepository(ClipCollectionClip)
    private readonly clipCollectionClipRepository: Repository<
      ClipCollectionClip
    >,
    private readonly clipService: ClipService,
  ) {}

  // async count(findOptions: FindOneOptions<ClipComment>) {
  //   return await this.commentsRepository.count(findOptions);
  // }

  // async findOne(findOptions: FindOneOptions<ClipComment>) {
  //   return await this.commentsRepository.findOne(findOptions);
  // }

  // async find(findOptions: FindManyOptions<ClipComment>) {
  //   return await this.commentsRepository.find(findOptions);
  // }

  async create(payload: DeepPartial<ClipCollection>) {
    const newClipCollection = new ClipCollection();

    Object.keys(payload).forEach(key => {
      newClipCollection[key] = payload[key];
    });

    return this.clipCollectionRepository.save(newClipCollection);
  }

  async addClip({ clipCollectionId, clipId }) {
    // Dup check

    // Clip is exist?
    await this.clipService.getById(clipId);

    const clipCollectionClip = new ClipCollectionClip();
    clipCollectionClip.id = `${clipCollectionId}-${clipId}`;
    clipCollectionClip.clipCollectionId = clipCollectionId;
    clipCollectionClip.clipId = clipId;

    return this.clipCollectionClipRepository.save(clipCollectionClip);
  }

  async removeAllClips({ clipCollectionId }) {
    return this.clipCollectionClipRepository.delete({ clipCollectionId });
  }

  // async remove(findOptions: FindConditions<ClipComment>) {
  //   return this.commentsRepository.delete(findOptions);
  // }

  // async update(
  //   findOptions: FindConditions<ClipComment>,
  //   data: DeepPartial<ClipComment>,
  // ) {
  //   return this.commentsRepository.update(findOptions, data);
  // }
}
