import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TwitchChannel {
  @Field()
  id: string;

  @Field()
  login: string;

  @Field()
  display_name: string;

  @Field()
  profile_image_url: string;
}
