import { Field, ObjectType } from '@nestjs/graphql';
import { SpotifyModeCurrentAction } from './action';
import { SpotifyModeCurrentItem } from './item.model';

@ObjectType()
export class SpotifyModeCurrent {
  @Field(() => [SpotifyModeCurrentAction])
  actions: SpotifyModeCurrentAction[];

  @Field(() => SpotifyModeCurrentItem, { nullable: true })
  item?: SpotifyModeCurrentItem;
}
