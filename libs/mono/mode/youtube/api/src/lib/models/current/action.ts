import { registerEnumType } from '@nestjs/graphql';

export enum YoutubeModeCurrentAction {
  SKIP,
}

registerEnumType(YoutubeModeCurrentAction, {
  name: 'YoutubeModeCurrentAction',
});
