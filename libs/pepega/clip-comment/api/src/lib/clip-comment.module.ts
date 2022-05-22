import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '@dream/pepega-prisma';
import { ClipCommentResolver } from './clip-comment.resolver';

@Module({
  imports: [PrismaModule, HttpModule],
  providers: [ClipCommentResolver],
})
export class ClipCommentModule {}
