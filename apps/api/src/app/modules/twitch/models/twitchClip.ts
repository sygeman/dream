import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TwitchClip {
  @Field() 'id': string;
  @Field() 'url': string;
  @Field() 'embed_url': string;
  @Field() 'broadcaster_id': string;
  @Field() 'broadcaster_name': string;
  @Field() 'creator_id': string;
  @Field() 'creator_name': string;
  @Field() 'video_id': string;
  @Field() 'game_id': string;
  @Field() 'language': string;
  @Field() 'title': string;
  @Field() 'created_at': string;
  @Field() 'thumbnail_url': string;
  @Field((type) => Int)
  'view_count': number;
}
