import { registerEnumType } from '@nestjs/graphql';

export enum YoutubeModeHistoryItemAction {
  ADD_TO_QUEUE,
}

registerEnumType(YoutubeModeHistoryItemAction, {
  name: 'YoutubeModeHistoryItemAction',
});
