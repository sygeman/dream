import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '@dream/pepega-prisma';
import { UserCoinResolver } from './user-coin.resolver';
import { UserCoinService } from './user-coin.service';

@Module({
  imports: [PrismaModule, HttpModule],
  providers: [UserCoinResolver, UserCoinService],
  exports: [UserCoinService],
})
export class UserCoinModule {}
