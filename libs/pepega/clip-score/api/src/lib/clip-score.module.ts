import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '@dream/pepega-prisma';
import { ClipScoreResolver } from './clip-score.resolver';
import { ClipModule } from '@dream/pepega/clip/api';

@Module({
  imports: [PrismaModule, HttpModule, ClipModule],
  providers: [ClipScoreResolver],
})
export class ClipScoreModule {}
