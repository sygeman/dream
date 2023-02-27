import { Global, Module } from '@nestjs/common';
import { PrismaModule } from '@dream/mono-prisma';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
// import { SpotifyStrategy } from './strategies/spotify.strategy';
import { TwitchStrategy } from './strategies/twitch.strategy';
import { AuthGuard } from './guards/auth.guard';

@Global()
@Module({
  imports: [PassportModule, PrismaModule],
  controllers: [AuthController],
  providers: [
    AuthResolver,
    AuthService,
    // SpotifyStrategy,
    TwitchStrategy,
    AuthGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}

// auth.site.com/login/[provider]
// auth.site.com/connect/[provider]

// client -> /auth/twitch -> passport (twitch) -> /authend/twitch
// -> client/callback ?authcode=randomkey&backUrl=/somepath
// -> getTockensByAuthCode(randomkey) -> setToStorage(tokens)
