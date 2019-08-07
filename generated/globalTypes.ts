/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum CurrencyType {
  coin = "coin",
  real = "real",
}

export enum PostReactionType {
  dislike = "dislike",
  like = "like",
  none = "none",
}

export enum UserRole {
  admin = "admin",
  mod = "mod",
  user = "user",
}

export interface ChatMessageCreateInput {
  text: string;
  chatId: string;
}

export interface ClipCommentCreateInput {
  content: string;
  clipId: string;
}

export interface CommunityCreateInput {
  name: string;
  description: string;
  avatar?: string | null;
}

export interface PostCreateInput {
  title?: string | null;
  clipId?: string | null;
  nfws?: boolean | null;
  spoiler?: boolean | null;
}

export interface PostOrderInput {
  rating?: string | null;
  createdAt?: string | null;
}

export interface PostReactionInput {
  userId?: string | null;
  type?: PostReactionType | null;
}

export interface PostWhereInput {
  id?: string | null;
  authorId?: string | null;
  reactions?: PostReactionInput | null;
  createdAt?: WhereDate | null;
  rating?: WhereNumber | null;
}

export interface WalletWhereInput {
  userId?: string | null;
  currency?: CurrencyType | null;
}

export interface WhereDate {
  limit?: string | null;
}

export interface WhereNumber {
  more?: number | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
