import { Field, ObjectType } from '@nestjs/graphql';
import { YoutubeModeCurrentAction } from './action';
import { YoutubeModeCurrentItem } from './item.model';

@ObjectType()
export class YoutubeModeCurrent {
  @Field(() => [YoutubeModeCurrentAction])
  actions: YoutubeModeCurrentAction[];

  @Field(() => YoutubeModeCurrentItem, { nullable: true })
  item?: YoutubeModeCurrentItem;
}
