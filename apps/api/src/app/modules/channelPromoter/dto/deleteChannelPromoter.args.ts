import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class DeleteChannelPromoterArgs {
  @Field((type) => ID)
  id: string;
}
