import { Module } from '@nestjs/common';
import { PrismaModule } from '@dream/prisma';
import { CommunitySettingsResolver } from './community-settings.resolver';

@Module({
  imports: [PrismaModule],
  providers: [CommunitySettingsResolver],
})
export class CommunitySettingsModule {}
