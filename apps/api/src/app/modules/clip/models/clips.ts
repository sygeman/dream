import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Clip } from './clip';

@ObjectType()
export class Clips {
  @Field()
  count: number;

  @Field((type) => [Clip])
  clips: Clip[];
}
