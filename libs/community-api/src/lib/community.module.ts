import { Module } from '@nestjs/common';
import { PrismaModule } from '@dream/prisma';
import { CommunityResolver } from './community.resolver';
import { ChannelResolver } from './channel.resolver';

@Module({
  imports: [PrismaModule],
  providers: [CommunityResolver, ChannelResolver],
  exports: [],
})
export class CommunityModule {}
