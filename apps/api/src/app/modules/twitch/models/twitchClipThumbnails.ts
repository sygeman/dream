import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TwitchClipThumbnails {
  @Field() medium: string;

  @Field() small: string;

  @Field() tiny: string;
}
