import { Field, ObjectType } from '@nestjs/graphql';
import { ModeWaitlistSpotifyHistory } from './history/model';
import { ModeWaitlistSpotifyCurrent } from './current/model';
import { ModeWaitlistSpotifyQueue } from './queue/model';

@ObjectType()
export class ModeWaitlistSpotify {
  @Field(() => ModeWaitlistSpotifyHistory)
  history: ModeWaitlistSpotifyHistory;

  @Field(() => ModeWaitlistSpotifyCurrent)
  current?: ModeWaitlistSpotifyCurrent;

  @Field(() => ModeWaitlistSpotifyQueue)
  queue: ModeWaitlistSpotifyQueue;
}
