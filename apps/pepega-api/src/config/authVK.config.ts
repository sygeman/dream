import { registerAs } from '@nestjs/config';

export default registerAs('authVK', () => ({
  clientID: process.env.VK_ID,
  clientSecret: process.env.VK_SECRET,
  callbackURL: process.env.VK_URL
}));
