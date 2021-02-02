import { IsOptional, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CommunityCreateInput {
  @Field()
  @Length(1, 100)
  name: string;

  @Field({ nullable: true, defaultValue: '' })
  @Length(1, 200)
  description: string;

  @Field({ nullable: true })
  @Length(1, 300)
  avatar: string;
}
