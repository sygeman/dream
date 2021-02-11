import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class TwitchTopClipsArgs {
  @Field({ nullable: true })
  channel?: string;

  @Field({ nullable: true })
  game?: string;

  @Field((type) => Int, { nullable: true })
  limit?: number;
}
