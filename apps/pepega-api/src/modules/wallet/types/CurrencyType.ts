import { registerEnumType } from 'type-graphql';

export enum CurrencyType {
  coin = 'coin',
  real = 'real',
}

registerEnumType(CurrencyType, {
  name: 'CurrencyType',
});
