import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './channel.entity';
import { ChannelResolver } from './channel.resolver';
import { ChannelService } from './channel.service';
import { TwitchModule } from '../twitch/twitch.module';

@Module({
  providers: [ChannelService, ChannelResolver],
  imports: [TypeOrmModule.forFeature([Channel]), TwitchModule],
  exports: [ChannelService],
})
export class ChannelModule {}
