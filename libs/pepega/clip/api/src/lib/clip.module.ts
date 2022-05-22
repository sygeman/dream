import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '@dream/pepega-prisma';
import { ClipResolver } from './clip.resolver';

@Module({
  imports: [PrismaModule, HttpModule],
  providers: [ClipResolver],
})
export class ClipModule {}
