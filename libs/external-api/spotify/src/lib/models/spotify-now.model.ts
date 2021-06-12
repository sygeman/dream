import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SpotifyNow {
  @Field()
  id: string;

  @Field()
  imageUrl: string;

  @Field()
  artist: string;

  @Field()
  name: string;

  @Field(() => Float)
  progress: number;
}
