import { Field, ObjectType } from '@nestjs/graphql';
import { YoutubeModeQueueAction } from './action';
import { YoutubeModeQueueItem } from './item.model';

@ObjectType()
export class YoutubeModeQueue {
  @Field(() => [YoutubeModeQueueAction])
  actions: YoutubeModeQueueAction[];

  @Field(() => [YoutubeModeQueueItem])
  items: YoutubeModeQueueItem[];
}
