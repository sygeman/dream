import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class ClipsInput {
  @Field(() => ID)
  cursor?: string;
}
