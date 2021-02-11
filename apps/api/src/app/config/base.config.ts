import { registerAs } from '@nestjs/config';
import { nanoid } from 'nanoid';

export default registerAs('base', () => ({
  instanceId: nanoid(10),
  appPrefix: 'ravepro',
  apiURL: process.env.API_URL,
  baseURL: process.env.BASE_URL,
}));
