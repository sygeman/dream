import { registerEnumType } from '@nestjs/graphql';

export enum ModeWaitlistYoutubeHistoryAction {
  ADD_VIDEO,
}

registerEnumType(ModeWaitlistYoutubeHistoryAction, {
  name: 'ModeWaitlistYoutubeHistoryAction',
});
