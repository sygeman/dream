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
    redisPort: process.env.REDIS_PORT,
    redisHost: process.env.REDIS_HOST,
    redisUrl: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    minioAccessKey: process.env.MINIO_ACCESS_KEY,
    minioSecretKey: process.env.MINIO_SECRET_KEY,
  })),
];
