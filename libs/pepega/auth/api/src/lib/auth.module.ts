import { Global, Module } from '@nestjs/common';
import { PrismaModule } from '@dream/pepega-prisma';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { TwitchStrategy } from './strategies/twitch.strategy';
import { AuthGuard } from './guards/auth.guard';

@Global()
@Module({
  imports: [PassportModule, PrismaModule],
  controllers: [AuthController],
  providers: [AuthResolver, AuthService, TwitchStrategy, AuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
