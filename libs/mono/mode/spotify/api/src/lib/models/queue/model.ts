import { Field, ObjectType } from '@nestjs/graphql';
import { SpotifyModeQueueAction } from './action';
import { SpotifyModeQueueItem } from './item.model';

@ObjectType()
export class SpotifyModeQueue {
  @Field(() => [SpotifyModeQueueAction])
  actions: SpotifyModeQueueAction[];

  @Field(() => [SpotifyModeQueueItem])
  items: SpotifyModeQueueItem[];
}
