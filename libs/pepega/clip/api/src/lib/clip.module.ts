import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '@dream/pepega-prisma';
import { ClipResolver } from './clip.resolver';
import { ClipService } from './clip.service';

@Module({
  imports: [PrismaModule, HttpModule],
  providers: [ClipResolver, ClipService],
  exports: [ClipService],
})
export class ClipModule {}
