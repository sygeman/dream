import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class SetChannelPromoterActiveArgs {
  @Field(type => ID)
  id: string;

  @Field(type => Boolean)
  active: boolean;
}
