import { ArgsType, Field, Int, ID } from '@nestjs/graphql';
import { Min, Max } from 'class-validator';

@ArgsType()
export class SetChannelPromoterCostArgs {
  @Field((type) => ID)
  id: string;

  @Field((type) => Int)
  @Min(0)
  @Max(50)
  cost: number;
}
