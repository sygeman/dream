import { Module } from '@nestjs/common';
import { PrismaModule } from '@dream/prisma';
import { TwitchStreamResolver } from './twitch-stream.resolver';
import { TwitchStreamService } from './twitch-stream.service';

@Module({
  imports: [PrismaModule],
  providers: [TwitchStreamResolver, TwitchStreamService],
  exports: [TwitchStreamService],
})
export class TwitchStreamModule {}
