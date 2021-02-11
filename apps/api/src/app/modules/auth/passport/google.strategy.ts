import { Strategy } from 'passport-google-oauth2';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProfilePayload } from '../../profile/types/ProfilePayload';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly config: ConfigService) {
    super(config.get('authGoogle'));
  }

  async validate(a, r, profile): Promise<ProfilePayload> {
    return {
      serviceId: profile.id,
      serviceName: 'google',
      name: profile.displayName,
      email: profile.email,
      avatar: profile.picture
    };
  }
}
