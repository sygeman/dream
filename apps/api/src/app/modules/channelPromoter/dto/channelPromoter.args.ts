import { ArgsType, Field, ID } from '@nestjs/graphql';
import { ChannelPromoterWhereUniqueInput } from './channelPromoter.where.unique.args';

@ArgsType()
export class ChannelPromoterArgs {
  @Field((type) => ChannelPromoterWhereUniqueInput)
  where: ChannelPromoterWhereUniqueInput;
}
