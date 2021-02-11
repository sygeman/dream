import { registerEnumType } from '@nestjs/graphql';

export enum CurrencyType {
  coin = 'coin',
  real = 'real',
}

registerEnumType(CurrencyType, {
  name: 'CurrencyType',
});
