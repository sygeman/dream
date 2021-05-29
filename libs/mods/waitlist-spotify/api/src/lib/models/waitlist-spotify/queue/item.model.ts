import { Field, ObjectType } from '@nestjs/graphql';
import { ModeWaitlistSpotifyQueueItemAction } from './item-action';
import { ModeWaitlistSpotifyQueueItemData } from './item-data.model';

@ObjectType()
export class ModeWaitlistSpotifyQueueItem {
  @Field(() => [ModeWaitlistSpotifyQueueItemAction])
  actions: ModeWaitlistSpotifyQueueItemAction[];

  @Field(() => ModeWaitlistSpotifyQueueItemData)
  data: ModeWaitlistSpotifyQueueItemData;
}
