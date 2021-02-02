import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secretKey: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES,
  cookieDomain: process.env.COOKIE_DOMAIN || null,
  sessionSecret: process.env.SESSION_SECRET
}));
