import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class TwitchStreamArgs {
  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  userName?: string;
}
