import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  FindOneOptions,
  FindManyOptions,
  FindConditions,
  DeepPartial,
} from 'typeorm';
import { Community } from './community.entity';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(Community)
    private readonly communityRepository: Repository<Community>,
  ) {}

  async count(findOptions: FindOneOptions<Community>) {
    return await this.communityRepository.count(findOptions);
  }

  async findOne(findOptions: FindOneOptions<Community>) {
    return await this.communityRepository.findOne(findOptions);
  }

  async find(findOptions: FindManyOptions<Community>) {
    return await this.communityRepository.find(findOptions);
  }

  async create(commentPayload: DeepPartial<Community>) {
    const newComment = new Community();

    Object.keys(commentPayload).forEach(key => {
      newComment[key] = commentPayload[key];
    });

    return this.communityRepository.save(newComment);
  }

  async remove(findOptions: FindConditions<Community>) {
    return this.communityRepository.delete(findOptions);
  }

  async update(findOptions: FindConditions<Community>, data: any) {
    return this.communityRepository.update(findOptions, data);
  }
}
