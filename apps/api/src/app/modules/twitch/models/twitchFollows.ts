import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TwitchFollowData } from './twitchFollowData';
import { TwitchPagination } from './pagination';

@ObjectType()
export class TwitchFollows {
  @Field((type) => Int)
  total: number;

  @Field((type) => [TwitchFollowData])
  data: TwitchFollowData[];

  @Field((type) => TwitchPagination)
  pagination: TwitchPagination;
}
