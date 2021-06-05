import { Field, ObjectType } from '@nestjs/graphql';
import { ModeWaitlistSpotifyHistoryItemAction } from './item-action';
import { ModeWaitlistSpotifyHistoryItemData } from './item-data.model';

@ObjectType()
export class ModeWaitlistSpotifyHistoryItem {
  @Field(() => [ModeWaitlistSpotifyHistoryItemAction])
  actions: ModeWaitlistSpotifyHistoryItemAction[];

  @Field(() => ModeWaitlistSpotifyHistoryItemData)
  data: ModeWaitlistSpotifyHistoryItemData;
}
