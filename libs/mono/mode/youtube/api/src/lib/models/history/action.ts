import { registerEnumType } from '@nestjs/graphql';

export enum YoutubeModeHistoryAction {
  ADD_VIDEO,
}

registerEnumType(YoutubeModeHistoryAction, {
  name: 'YoutubeModeHistoryAction',
});
