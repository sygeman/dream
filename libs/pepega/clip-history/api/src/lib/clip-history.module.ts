import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '@dream/pepega-prisma';
import { ClipHistoryResolver } from './clip-history.resolver';

@Module({
  imports: [PrismaModule, HttpModule],
  providers: [ClipHistoryResolver],
})
export class ClipHistoryModule {}
