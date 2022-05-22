import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '@dream/pepega-prisma';
import { ClipScoreResolver } from './clip-score.resolver';

@Module({
  imports: [PrismaModule, HttpModule],
  providers: [ClipScoreResolver],
})
export class ClipScoreModule {}
