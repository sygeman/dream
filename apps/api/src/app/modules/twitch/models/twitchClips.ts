import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TwitchClip } from './twitchClip';
import { TwitchPagination } from './pagination';

@ObjectType()
export class TwitchClips {
  @Field((type) => [TwitchClip])
  data: TwitchClip[];

  @Field((type) => TwitchPagination)
  pagination: TwitchPagination;
}
