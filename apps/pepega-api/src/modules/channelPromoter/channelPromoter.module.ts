import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChannelPromoter } from './channelPromoter.entity';
import { ChannelPromoterResolver } from './channelPromoter.resolver';
import { ChannelPromoterService } from './channelPromoter.service';
import { ChannelModule } from '../channel/channel.module';
import { TwitchModule } from '../twitch/twitch.module';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChannelPromoter]),
    ChannelModule,
    TwitchModule,
    WalletModule,
  ],
  providers: [ChannelPromoterService, ChannelPromoterResolver],
  exports: [ChannelPromoterService],
})
export class ChannelPromoterModule {}
