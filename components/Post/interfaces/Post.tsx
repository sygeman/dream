export interface ITag {
  id?: string;
  title?: string;
}

export enum PostReactionType {
  like = 'like',
  dislike = 'dislike',
  none = 'none'
}

export interface IPost {
  id?: string;
  title?: string;
  nfws?: boolean;
  spoiler?: boolean;
  sourceId?: string;
  cover?: string;
  sourceType?: string;
  liked?: boolean;
  likes?: number;
  dislikes?: number;
  rating?: number;
  createdAt?: string;
  channelName?: string;
  reaction?: PostReactionType;
  authorId?: string;
}
