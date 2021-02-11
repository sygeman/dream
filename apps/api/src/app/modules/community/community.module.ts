import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Community } from './community.entity';
import { CommunityResolver } from './community.resolver';
import { CommunityService } from './community.service';
import { ChatModule } from '../chat/chat.module';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [TypeOrmModule.forFeature([Community]), ChatModule, WalletModule],
  providers: [CommunityResolver, CommunityService],
  exports: [CommunityService]
})
export class CommunityModule {}
