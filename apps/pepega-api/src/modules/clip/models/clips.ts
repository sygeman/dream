import { Field, ObjectType, Int } from 'type-graphql';
import { Clip } from './clip';

@ObjectType()
export class Clips {
  @Field()
  count: number;

  @Field(type => [Clip])
  clips: Clip[];
}
