import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secretKey: 'ajsfijasbfabjfasjfajlfd',
  expiresIn: 86400,
}));
