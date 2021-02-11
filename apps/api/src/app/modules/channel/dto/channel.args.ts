import { ArgsType, Field, ID } from '@nestjs/graphql';
import { ChannelWhereUniqueInput } from './channel.where.unique.args';

@ArgsType()
export class ChannelArgs {
  @Field((type) => ChannelWhereUniqueInput)
  where: ChannelWhereUniqueInput;
}
