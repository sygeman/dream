import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClipHistoryService } from './clipHistory.service';
import { ClipHistoryResolver } from './clipHistory.resolver';
import { ClipModule } from '../clip/clip.module';

import { ClipHistory } from './clipHistory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClipHistory]), ClipModule],
  providers: [ClipHistoryService, ClipHistoryResolver],
  exports: [ClipHistoryService],
})
export class ClipHistoryModule {}
