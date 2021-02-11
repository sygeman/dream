import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateChannelPromoterArgs {
  @Field()
  channelName: string;
}
