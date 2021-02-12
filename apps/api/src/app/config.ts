import { registerAs } from '@nestjs/config';
import { nanoid } from 'nanoid';

export const config = [
  registerAs('auth', () => ({
    secretKey: 'ajsfijasbfabjfasjfajlfd',
    expiresIn: 86400,
  })),
  registerAs('authGoogle', () => ({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_URL,
    scope: ['profile', 'email'],
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
  registerAs('authVK', () => ({
    clientID: process.env.VK_ID,
    clientSecret: process.env.VK_SECRET,
    callbackURL: process.env.VK_URL,
  })),
  registerAs('base', () => ({
    instanceId: nanoid(10),
    appPrefix: 'ravepro',
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
  registerAs('robokassa', () => ({
    authUrl: 'https://auth.robokassa.ru/Merchant/Index.aspx',
    culture: 'ru',
    hashMethod: 'sha512',
    encoding: 'utf-8',
    description: 'Покупка PepeCoin',
    isTest: process.env.ROBOKASSA_IS_TEST === 'TRUE',
    login: process.env.ROBOKASSA_LOGIN,
    password1: process.env.ROBOKASSA_PASSWORD_1,
    password2: process.env.ROBOKASSA_PASSWORD_2,
    password1Test: process.env.ROBOKASSA_PASSWORD_1_TEST,
    password2Test: process.env.ROBOKASSA_PASSWORD_2_TEST,
    realCoinPacks: {
      10: 0,
      100: 10,
      500: 15,
      1000: 20,
      5000: 30,
      10000: 40,
      25000: 60,
    },
  })),
];
