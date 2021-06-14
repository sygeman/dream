import { registerEnumType } from '@nestjs/graphql';

export enum ModeWaitlistYoutubeCurrentAction {
  SKIP,
}

registerEnumType(ModeWaitlistYoutubeCurrentAction, {
  name: 'ModeWaitlistYoutubeCurrentAction',
});
