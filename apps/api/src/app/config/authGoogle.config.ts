import { registerAs } from '@nestjs/config';

export default registerAs('authGoogle', () => ({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.GOOGLE_URL,
  scope: ['profile', 'email']
}));
