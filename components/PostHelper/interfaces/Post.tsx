export interface ITag {
  id?: string;
  title?: string;
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
  likesCount?: number;
  commentsCount?: number;
  createdAt?: string;
  channelName?: string;
  authorId?: string;
  tags?: ITag[];
  pinned?: boolean;
}
