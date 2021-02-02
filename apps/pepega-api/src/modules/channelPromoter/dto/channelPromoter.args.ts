import { ArgsType, Field, ID } from 'type-graphql';
import { ChannelPromoterWhereUniqueInput } from './channelPromoter.where.unique.args';

@ArgsType()
export class ChannelPromoterArgs {
  @Field(type => ChannelPromoterWhereUniqueInput)
  where: ChannelPromoterWhereUniqueInput;
}
