import { Module } from '@nestjs/common';
import { PrismaModule } from '@dream/prisma/mono';
import { TwitchModeResolver } from './twitch-mode.resolver';
import { TwitchModeService } from './twitch-mode.service';

@Module({
  imports: [PrismaModule],
  providers: [TwitchModeResolver, TwitchModeService],
  exports: [TwitchModeService],
})
export class TwitchModeModule {}
