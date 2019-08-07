/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: clipCommentCreated
// ====================================================

export interface clipCommentCreated_clipCommentCreated_author {
  __typename: "User";
  id: string;
  name: string | null;
  avatar: string | null;
  role: UserRole;
  banned: boolean;
}

export interface clipCommentCreated_clipCommentCreated {
  __typename: "ClipComment";
  id: string;
  content: string;
  clipId: string;
  authorId: string;
  author: clipCommentCreated_clipCommentCreated_author;
  createdAt: string;
}

export interface clipCommentCreated {
  clipCommentCreated: clipCommentCreated_clipCommentCreated;
}

export interface clipCommentCreatedVariables {
  clipId: string;
}
