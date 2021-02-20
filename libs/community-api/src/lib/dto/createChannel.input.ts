import { Field, ID, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class CreateChannelInput {
  @Field(() => ID)
  communityId: string;

  @Field()
  @Length(1, 50)
  name: string;

  @Field()
  @Length(1, 50)
  title: string;
}
