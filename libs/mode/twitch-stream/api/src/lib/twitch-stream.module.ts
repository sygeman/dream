import { Module } from '@nestjs/common';
import { PrismaModule } from '@dream/prisma';
import { TwitchStreamResolver } from './twitch-stream.resolver';

@Module({
  imports: [PrismaModule],
  providers: [TwitchStreamResolver],
  exports: [],
})
export class TwitchStreamModule {}
