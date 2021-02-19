import { Module } from '@nestjs/common';
import { PrismaModule } from '@dream/prisma';
import { CommunityResolver } from './community.resolver';
import { ChannelResolver } from './channel.resolver';
import { ChannelMessageResolver } from './message.resolver';

@Module({
  imports: [PrismaModule],
  providers: [CommunityResolver, ChannelResolver, ChannelMessageResolver],
  exports: [],
})
export class CommunityModule {}
