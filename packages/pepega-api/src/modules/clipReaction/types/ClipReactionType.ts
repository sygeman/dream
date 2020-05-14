import { registerEnumType } from 'type-graphql';

export enum ClipReactionType {
  like = 'like',
  dislike = 'dislike',
  none = 'none',
}

registerEnumType(ClipReactionType, {
  name: 'ClipReactionType',
});
