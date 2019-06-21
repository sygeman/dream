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
  liked?: boolean;
  likes?: number;
  dislikes?: number;
  rating?: number;
  createdAt?: string;
  channelName?: string;
  deleted?: boolean;
  authorId?: string;
}
