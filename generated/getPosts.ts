/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PostWhereInput, PostOrderInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getPosts
// ====================================================

export interface getPosts_posts_posts {
  __typename: "Post";
  id: string;
  nfws: boolean;
  spoiler: boolean;
  cover: string;
  title: string;
  channelName: string;
  rating: number;
  deleted: boolean;
  createdAt: string;
}

export interface getPosts_posts {
  __typename: "Posts";
  count: number;
  posts: getPosts_posts_posts[];
}

export interface getPosts {
  posts: getPosts_posts;
}

export interface getPostsVariables {
  where?: PostWhereInput | null;
  order?: PostOrderInput | null;
  skip?: number | null;
  first?: number | null;
}
