import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClipCollection } from './clipCollection.entity';
import { ClipCollectionClip } from './clipCollectionClip.entity';

import { ClipCollectionService } from './clipCollection.service';
// import { ClipCommentResolver } from './clipComment.resolver';

import { ClipModule } from '../clip/clip.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClipCollection, ClipCollectionClip]),
    ClipModule,
  ],
  providers: [ClipCollectionService],
  exports: [ClipCollectionService],
})
export class ClipCollectionModule {}
