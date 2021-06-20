import { registerEnumType } from '@nestjs/graphql';

export enum YoutubeModeQueueItemAction {
  CANCEL,
}

registerEnumType(YoutubeModeQueueItemAction, {
  name: 'YoutubeModeQueueItemAction',
});
