import { PrismaModule } from '@dream/prisma';
import { Module } from '@nestjs/common';
import { ChannelSettingsResolver } from './channel-settings.resolver';

@Module({
  imports: [PrismaModule],
  providers: [ChannelSettingsResolver],
})
export class ChannelSettingsModule {}
