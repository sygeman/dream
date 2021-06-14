import { Field, ObjectType } from '@nestjs/graphql';
import { ModeWaitlistYoutubeCurrentAction } from './action';
import { ModeWaitlistYoutubeCurrentItem } from './item.model';

@ObjectType()
export class ModeWaitlistYoutubeCurrent {
  @Field(() => [ModeWaitlistYoutubeCurrentAction])
  actions: ModeWaitlistYoutubeCurrentAction[];

  @Field(() => ModeWaitlistYoutubeCurrentItem, { nullable: true })
  item?: ModeWaitlistYoutubeCurrentItem;
}
