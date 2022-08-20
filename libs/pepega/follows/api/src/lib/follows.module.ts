import { PrismaModule } from '@dream/pepega-prisma';
import { TwitchModule } from '@dream/pepega/twitch/api';
import { Module } from '@nestjs/common';
import { FollowsResolver } from './follows.resolver';

@Module({
  imports: [PrismaModule, TwitchModule],
  providers: [FollowsResolver],
  exports: [],
})
export class FollowsModule {}
