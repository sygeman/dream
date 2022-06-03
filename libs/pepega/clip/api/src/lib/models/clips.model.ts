import { Field, ObjectType } from '@nestjs/graphql';
import { Clip } from './clip.model';

@ObjectType()
export class Clips {
  @Field(() => [Clip])
  clips: Clip[];

  @Field({ nullable: true })
  cursor?: string;
}
