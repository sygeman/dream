import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class CreateCommunityInput {
  @Field()
  @Length(1, 50)
  name: string;

  @Field()
  @Length(1, 50)
  title: string;
}
