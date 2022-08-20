import { Module } from '@nestjs/common';
import { PrismaModule } from '@dream/mono-prisma';
import { TenorModule } from '@dream/mono-external-tenor';
import { CommunityResolver } from './community.resolver';
import { ChannelResolver } from './channel.resolver';
import { ChannelMessageResolver } from './message.resolver';

@Module({
  imports: [PrismaModule, TenorModule],
  providers: [CommunityResolver, ChannelResolver, ChannelMessageResolver],
})
export class CommunityModule {}
