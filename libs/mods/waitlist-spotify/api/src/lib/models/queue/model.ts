import { Field, ObjectType } from '@nestjs/graphql';
import { ModeWaitlistSpotifyQueueAction } from './action';
import { ModeWaitlistSpotifyQueueItem } from './item.model';

@ObjectType()
export class ModeWaitlistSpotifyQueue {
  @Field(() => [ModeWaitlistSpotifyQueueAction])
  actions: ModeWaitlistSpotifyQueueAction[];

  @Field(() => [ModeWaitlistSpotifyQueueItem])
  items: ModeWaitlistSpotifyQueueItem[];
}
