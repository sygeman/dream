import { registerAs } from '@nestjs/config';

export default registerAs('robokassa', () => ({
  authUrl: 'https://auth.robokassa.ru/Merchant/Index.aspx',
  culture: 'ru',
  hashMethod: 'sha512',
  encoding: 'utf-8',
  description: 'Покупка PepeCoin',
  isTest: process.env.ROBOKASSA_IS_TEST === 'TRUE',
  login: process.env.ROBOKASSA_LOGIN,
  password1: process.env.ROBOKASSA_PASSWORD_1,
  password2: process.env.ROBOKASSA_PASSWORD_2,
  password1Test: process.env.ROBOKASSA_PASSWORD_1_TEST,
  password2Test: process.env.ROBOKASSA_PASSWORD_2_TEST,
  realCoinPacks: {
    10: 0,
    100: 10,
    500: 15,
    1000: 20,
    5000: 30,
    10000: 40,
    25000: 60
  }
}));
