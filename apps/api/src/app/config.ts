import { registerAs } from '@nestjs/config';
import { nanoid } from 'nanoid';

export const config = [
  registerAs('auth', () => ({
    sessionSecret: process.env.SESSION_SECRET,
  })),
  registerAs('authSpotify', () => ({
    clientID: process.env.SPOTIFY_ID,
    clientSecret: process.env.SPOTIFY_SECRET,
    callbackURL: process.env.SPOTIFY_URL,
    scope: ['user-read-email', 'user-read-playback-state'],
  })),
  registerAs('authTwitch', () => ({
    clientID: process.env.TWITCH_ID,
    clientSecret: process.env.TWITCH_SECRET,
    callbackURL: process.env.TWITCH_URL,
    scope: 'user:read:email',
  })),
  registerAs('base', () => ({
    instanceId: nanoid(10),
    apiURL: process.env.API_URL,
    baseURL: process.env.BASE_URL,
  })),
  registerAs('db', () => ({
    redisUrl: process.env.REDIS_URL,
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT,
    pgUrl: process.env.PG_URL,
    pgSsl: !!process.env.PG_SSL || false,
  })),
];
