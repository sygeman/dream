import { registerEnumType } from '@nestjs/graphql';

export enum YoutubeModeQueueAction {
  ADD_VIDEO,
}

registerEnumType(YoutubeModeQueueAction, {
  name: 'YoutubeModeQueueAction',
});
