import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class TwitchGameArgs {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;
}
