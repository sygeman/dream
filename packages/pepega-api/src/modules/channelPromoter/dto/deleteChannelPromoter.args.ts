import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class DeleteChannelPromoterArgs {
  @Field(type => ID)
  id: string;
}
