import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Profile } from './profile.entity';

import { ProfileResolvers } from './profile.resolver';
import { ProfileService } from './profile.service';

import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), UserModule],
  providers: [ProfileService, ProfileResolvers],
  exports: [ProfileService],
})
export class ProfileModule {}
