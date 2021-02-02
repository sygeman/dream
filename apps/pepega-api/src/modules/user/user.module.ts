import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';

import { UsersService } from './user.service';
import { UsersResolvers } from './user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersResolvers],
  exports: [UsersService],
})
export class UserModule {}
