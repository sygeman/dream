import { Module } from '@nestjs/common';
import { PrismaModule } from '@dream/pepega-prisma';
import { ClipResolver } from './clip.resolver';
import { ClipService } from './clip.service';
import { TwitchModule } from '@dream/pepega/twitch/api';

@Module({
  imports: [PrismaModule, TwitchModule],
  providers: [ClipResolver, ClipService],
  exports: [ClipService],
})
export class ClipModule {}
