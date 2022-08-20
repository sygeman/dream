import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '@dream/pepega-prisma';
import { ClipModule } from '@dream/pepega/clip/api';
import { UserCoinModule } from '@dream/pepega/user-coin/api';
import { ClipHistoryResolver } from './clip-history.resolver';

@Module({
  imports: [PrismaModule, HttpModule, ClipModule, UserCoinModule],
  providers: [ClipHistoryResolver],
})
export class ClipHistoryModule {}
