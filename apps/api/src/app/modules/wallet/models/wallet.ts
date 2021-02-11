import { Field, Int, ObjectType, ID } from '@nestjs/graphql';
import { CurrencyType } from '../types/CurrencyType';

@ObjectType()
export class Wallet {
  @Field((type) => ID)
  id: string;

  @Field((type) => Int)
  balance: number;

  @Field((type) => CurrencyType)
  currency: CurrencyType;

  @Field()
  userId: String;

  @Field()
  createdAt: String;
}
