import * as uuid from 'uuid/v4';
import { registerAs } from '@nestjs/config';

export default registerAs('base', () => ({
  instanceId: uuid(),
  baseURL: process.env.BASE_URL,
  apiURL: process.env.API_URL,
  appPrefix: process.env.APP_PREFIX
}));
