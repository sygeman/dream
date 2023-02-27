import { registerAs } from '@nestjs/config';
import { nanoid } from 'nanoid';

export const config = [
  registerAs('youtube', () => ({
    key: process.env.YOUTUBE_KEY,
  })),
  registerAs('auth', () => ({
    sessionSecret: process.env.SESSION_SECRET,
  })),
  registerAs('authSpotify', () => ({
    clientID: process.env.SPOTIFY_ID,
    clientSecret: process.env.SPOTIFY_SECRET,
    callbackURL: `${process.env.NEXT_PUBLIC_MONO_API}authend/spotify`,
    scope: [
      'user-read-email',
      'user-read-playback-state',
      'user-modify-playback-state',
    ],
  })),
  registerAs('authTwitch', () => ({
    clientID: process.env.TWITCH_ID,
    clientSecret: process.env.TWITCH_SECRET,
    callbackURL: `${process.env.NEXT_PUBLIC_MONO_API}authend/twitch`,
    scope: 'user:read:email',
  })),
  registerAs('base', () => ({
    instanceId: nanoid(10),
    apiURL: process.env.NEXT_PUBLIC_MONO_API,
  })),
  registerAs('db', () => ({
    redisUrl: process.env.REDIS_URL,
  })),
];
