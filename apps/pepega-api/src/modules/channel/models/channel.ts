import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Channel {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  title?: string;

  @Field(type => Int)
  cost: number;

  @Field()
  live: boolean;
}
