import { registerEnumType } from '@nestjs/graphql';

export enum ModeWaitlistYoutubeQueueAction {
  ADD_VIDEO,
}

registerEnumType(ModeWaitlistYoutubeQueueAction, {
  name: 'ModeWaitlistYoutubeQueueAction',
});
