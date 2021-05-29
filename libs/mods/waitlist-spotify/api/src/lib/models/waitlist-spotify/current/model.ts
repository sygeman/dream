import { Field, ObjectType } from '@nestjs/graphql';
import { ModeWaitlistSpotifyCurrentAction } from './action';
import { ModeWaitlistSpotifyCurrentItem } from './item.model';

@ObjectType()
export class ModeWaitlistSpotifyCurrent {
  @Field(() => [ModeWaitlistSpotifyCurrentAction])
  actions: ModeWaitlistSpotifyCurrentAction[];

  @Field(() => ModeWaitlistSpotifyCurrentItem, { nullable: true })
  item?: ModeWaitlistSpotifyCurrentItem;
}
