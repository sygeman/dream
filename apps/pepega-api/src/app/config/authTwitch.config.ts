import { registerAs } from '@nestjs/config';

export default registerAs('authTwitch', () => ({
  clientID: process.env.TWITCH_ID,
  clientSecret: process.env.TWITCH_SECRET,
  callbackURL: process.env.TWITCH_URL,
  scope: 'user:read:email'
}));
