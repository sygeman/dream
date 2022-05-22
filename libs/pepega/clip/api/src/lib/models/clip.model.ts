import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Clip {
  @Field()
  id: string;

  @Field()
  sourceUrl: string;

  @Field()
  title: string;

  @Field()
  thumbnail_url: string;

  @Field()
  language: string;

  @Field()
  broadcaster_id: string;

  @Field()
  creator_id: string;

  @Field()
  video_id: string;

  @Field()
  game_id: string;

  @Field()
  created_at: string;

  @Field()
  score: number;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}
