import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClipComment } from './clipComment.entity';

import { ClipCommentService } from './clipComment.service';
import { ClipCommentResolver } from './clipComment.resolver';

import { ClipModule } from '../clip/clip.module';

@Module({
  imports: [TypeOrmModule.forFeature([ClipComment]), ClipModule],
  providers: [ClipCommentService, ClipCommentResolver],
  exports: [ClipCommentService],
})
export class ClipCommentModule {}
