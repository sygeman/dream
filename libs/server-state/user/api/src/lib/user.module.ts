import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '@dream/server-state/prisma';
import { UserResolver } from './user.resolver';

@Module({
  imports: [PrismaModule, HttpModule],
  providers: [UserResolver],
})
export class UserModule {}
