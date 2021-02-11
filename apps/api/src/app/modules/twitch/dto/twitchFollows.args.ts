import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class TwitchFollowsArgs {
  @Field((type) => Int, { nullable: true })
  offset?: number;

  @Field((type) => Int, { nullable: true })
  limit?: number;
}
