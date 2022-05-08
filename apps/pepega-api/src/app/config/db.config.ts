import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  redisUrl: process.env.REDIS_URL,
  redisHost: 'redis',
  redisPort: 6379,
  pgUrl: process.env.PG_URL,
  pgSsl: !!process.env.PG_SSL || false
}));
