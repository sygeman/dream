import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SpotifyModeQueueItemDataAuthor {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  avatar?: string;
}
