import { Strategy } from 'passport-twitch-helix';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProfilePayload } from '../../profile/types/ProfilePayload';

@Injectable()
export class TwitchStrategy extends PassportStrategy(Strategy, 'twitch') {
  constructor(private readonly config: ConfigService) {
    super(config.get('authTwitch'));
  }

  async validate(accessToken, refreshToken, profile): Promise<ProfilePayload> {
    return {
      serviceId: profile.id,
      serviceName: 'twitch',
      name: profile.displayName,
      email: profile._json.email,
      avatar: profile._json.profile_image_url,
      accessToken,
      refreshToken
    };
  }
}
