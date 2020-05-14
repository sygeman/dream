import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthResolvers } from './auth.resolver';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { ProfileModule } from '../profile/profile.module';
import { WalletModule } from '../wallet/wallet.module';
import { Token } from './tokens.entity';

import { GoogleStrategy } from './passport/google.strategy';
import { TwitchStrategy } from './passport/twitch.strategy';
import { VKStrategy } from './passport/vk.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
    UserModule,
    ProfileModule,
    WalletModule,
  ],
  providers: [
    AuthService,
    AuthResolvers,
    PassportModule,
    GoogleStrategy,
    TwitchStrategy,
    VKStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
