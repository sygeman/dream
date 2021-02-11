import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class SetChannelPromoterActiveArgs {
  @Field((type) => ID)
  id: string;

  @Field((type) => Boolean)
  active: boolean;
}
