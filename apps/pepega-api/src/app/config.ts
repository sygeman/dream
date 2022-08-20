import { registerAs } from '@nestjs/config';
import { nanoid } from 'nanoid';

export const config = [
  registerAs('auth', () => ({
    sessionSecret: process.env.SESSION_SECRET,
  })),
  registerAs('authTwitch', () => ({
    clientID: process.env.TWITCH_ID,
    clientSecret: process.env.TWITCH_SECRET,
    callbackURL: `${process.env.API_URL}authend/twitch`,
    scope: 'user:read:email user:read:follows',
  })),
  registerAs('base', () => ({
    instanceId: nanoid(10),
    apiURL: process.env.API_URL,
  })),
  registerAs('db', () => ({
    redisUrl: process.env.REDIS_URL,
    minioAccessKey: process.env.MINIO_ACCESS_KEY,
    minioSecretKey: process.env.MINIO_SECRET_KEY,
  })),
];
