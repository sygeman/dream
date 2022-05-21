import { Field, ObjectType } from '@nestjs/graphql';
// import { YoutubeModeHistoryAction } from './action';
import { YoutubeModeHistoryItem } from './item.model';

@ObjectType()
export class YoutubeModeHistory {
  // @Field(() => [YoutubeModeHistoryAction])
  // actions: YoutubeModeHistoryAction[];

  @Field(() => [YoutubeModeHistoryItem])
  items: YoutubeModeHistoryItem[];
}
