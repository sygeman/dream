import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  FindOneOptions,
  FindManyOptions,
  FindConditions,
  DeepPartial,
} from 'typeorm';

import { ClipComment } from './clipComment.entity';

@Injectable()
export class ClipCommentService {
  constructor(
    @InjectRepository(ClipComment)
    private readonly commentsRepository: Repository<ClipComment>,
  ) {}

  async count(findOptions: FindOneOptions<ClipComment>) {
    return await this.commentsRepository.count(findOptions);
  }

  async findOne(findOptions: FindOneOptions<ClipComment>) {
    return await this.commentsRepository.findOne(findOptions);
  }

  async find(findOptions: FindManyOptions<ClipComment>) {
    return await this.commentsRepository.find(findOptions);
  }

  async create(commentPayload: DeepPartial<ClipComment>) {
    const newComment = new ClipComment();

    Object.keys(commentPayload).forEach(key => {
      newComment[key] = commentPayload[key];
    });

    return this.commentsRepository.save(newComment);
  }

  async remove(findOptions: FindConditions<ClipComment>) {
    return this.commentsRepository.delete(findOptions);
  }

  async update(
    findOptions: FindConditions<ClipComment>,
    data: DeepPartial<ClipComment>,
  ) {
    return this.commentsRepository.update(findOptions, data);
  }

  async findAllPostIdsByComments(authorId: string): Promise<string[]> {
    const comments = await this.commentsRepository.query(
      `SELECT DISTINCT "postId"
       FROM "comment"
       WHERE "authorId" = '${authorId}'`,
    );

    return comments.map(comment => comment.postId);
  }
}
