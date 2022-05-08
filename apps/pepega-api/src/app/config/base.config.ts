import { nanoid } from 'nanoid';
import { registerAs } from '@nestjs/config';

export default registerAs('base', () => ({
  instanceId: nanoid(),
  baseURL: process.env.BASE_URL,
  apiURL: process.env.API_URL,
  appPrefix: process.env.APP_PREFIX,
}));
