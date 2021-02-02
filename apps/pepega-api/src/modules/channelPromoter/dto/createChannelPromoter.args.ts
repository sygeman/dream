import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class CreateChannelPromoterArgs {
  @Field()
  channelName: string;
}
