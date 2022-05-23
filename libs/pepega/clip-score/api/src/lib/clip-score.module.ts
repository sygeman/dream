import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '@dream/pepega-prisma';
import { ClipScoreResolver } from './clip-score.resolver';
import { ClipModule } from '@dream/pepega/clip/api';
import { UserCoinModule } from '@dream/pepega/user-coin/api';

@Module({
  imports: [PrismaModule, HttpModule, ClipModule, UserCoinModule],
  providers: [ClipScoreResolver],
})
export class ClipScoreModule {}
