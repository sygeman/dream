import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class ClipsInput {
  @Field(() => ID, { nullable: true })
  cursor?: string;

  @Field(() => String, { nullable: true })
  userId?: string;
}
