import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '@dream/pepega-prisma';
import { UserCoinResolver } from './user-coin.resolver';

@Module({
  imports: [PrismaModule, HttpModule],
  providers: [UserCoinResolver],
})
export class UserCoinModule {}
