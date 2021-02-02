import { ValidateNested, IsOptional } from 'class-validator';
import { Field, InputType, ID } from 'type-graphql';
import { CurrencyType } from '../types/CurrencyType';

@InputType()
export class WalletWhereInput {
  @Field(type => ID, { nullable: true })
  @IsOptional()
  @ValidateNested()
  userId: string;

  @Field(type => CurrencyType, {
    nullable: true,
    defaultValue: CurrencyType.coin,
  })
  @IsOptional()
  @ValidateNested()
  currency: CurrencyType;
}
