import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RKInvoice } from './rkinvoice.entity';
import { RobokassaService } from './robokassa.service';
import { RobokassaController } from './robokassa.controller';
import { WalletModule } from '../wallet/wallet.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [RobokassaController],
  imports: [TypeOrmModule.forFeature([RKInvoice]), AuthModule, WalletModule],
  providers: [RobokassaService],
})
export class RobokassaModule {}
