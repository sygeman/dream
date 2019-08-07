/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: post
// ====================================================

export interface post_post {
  __typename: "Post";
  id: string;
  title: string;
  nfws: boolean;
  spoiler: boolean;
  sourceId: string;
  cover: string;
  likes: number;
  dislikes: number;
  rating: number;
  deleted: boolean;
  createdAt: string;
  channelName: string;
  authorId: string;
}

export interface post {
  post: post_post;
}

export interface postVariables {
  id: string;
}
