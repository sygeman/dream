import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  redisUrl: process.env.REDIS_URL,
  redisHost: 'redis',
  redisPort: 6379,
  pgUrl: 'postgresql://postgres:postgres@postgres:5432/pepega',
  pgSsl: !!process.env.PG_SSL || false,
}));
