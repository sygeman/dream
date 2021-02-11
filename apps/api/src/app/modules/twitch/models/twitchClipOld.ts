import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TwitchClipThumbnails } from './twitchClipThumbnails';
import { TwitchClipBroadcaster } from './twitchClipBroadcaster';

@ObjectType()
export class TwitchClipOld {
  @Field() id: string;

  @Field() slug: string;

  @Field() channel: string;

  @Field() title: string;

  @Field() createdAt: string;

  @Field((type) => TwitchClipBroadcaster) broadcaster: TwitchClipBroadcaster;

  @Field((type) => TwitchClipThumbnails)
  thumbnails: TwitchClipThumbnails;

  @Field((type) => Int)
  viewsCount: number;
}
