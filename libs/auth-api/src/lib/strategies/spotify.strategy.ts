import { Strategy } from 'passport-spotify';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SpotifyStrategy extends PassportStrategy(Strategy, 'spotify') {
  constructor(private readonly config: ConfigService) {
    super(config.get('authSpotify'));
    Logger.log(config.get('authSpotify'));
  }

  async validate(accessToken, refreshToken, profile) {
    return {
      accessToken,
      refreshToken,
      provider: 'spotify',
      serviceId: profile?.id,
      name: profile?.displayName,
      email: profile?.emails[0]?.value,
      avatar: profile?.photos[0]?.value,
    };
  }
}
