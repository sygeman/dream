import { registerEnumType } from '@nestjs/graphql';

export enum ModeWaitlistYoutubeQueueItemAction {
  CANCEL,
}

registerEnumType(ModeWaitlistYoutubeQueueItemAction, {
  name: 'ModeWaitlistYoutubeQueueItemAction',
});
