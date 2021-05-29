import { Field, ObjectType } from '@nestjs/graphql';
// import { ModeWaitlistSpotifyHistoryAction } from './action';
import { ModeWaitlistSpotifyHistoryItem } from './item.model';

@ObjectType()
export class ModeWaitlistSpotifyHistory {
  // @Field(() => [ModeWaitlistSpotifyHistoryAction])
  // actions: ModeWaitlistSpotifyHistoryAction[];

  @Field(() => [ModeWaitlistSpotifyHistoryItem])
  items: ModeWaitlistSpotifyHistoryItem[];
}
