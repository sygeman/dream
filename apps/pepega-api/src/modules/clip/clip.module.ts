import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Clip } from './clip.entity';
import { ClipService } from './clip.service';
import { ClipResolver } from './clip.resolver';

import { ChannelModule } from '../channel/channel.module';
import { TwitchModule } from '../twitch/twitch.module';
import { ClipReactionModule } from '../clipReaction/clipReaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Clip]),
    TwitchModule,
    forwardRef(() => ClipReactionModule),
    ChannelModule,
  ],
  providers: [ClipService, ClipResolver],
  exports: [ClipService],
})
export class ClipModule {}
