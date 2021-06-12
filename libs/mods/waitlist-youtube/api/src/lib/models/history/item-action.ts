import { registerEnumType } from '@nestjs/graphql';

export enum ModeWaitlistYoutubeHistoryItemAction {
  ADD_TO_QUEUE,
}

registerEnumType(ModeWaitlistYoutubeHistoryItemAction, {
  name: 'ModeWaitlistYoutubeHistoryItemAction',
});
