import { ValidateNested, IsOptional } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';
import { WalletWhereInput } from './wallet.where.input';

@ArgsType()
export class WalletArgs {
  @Field(type => WalletWhereInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  where?: WalletWhereInput;
}
