import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { WalletService } from './wallet.service';
import { WalletResolvers } from './wallet.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet])],
  providers: [WalletService, WalletResolvers],
  exports: [WalletService],
})
export class WalletModule {}
