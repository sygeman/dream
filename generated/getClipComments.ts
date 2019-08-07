/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: getClipComments
// ====================================================

export interface getClipComments_clipComments_author {
  __typename: "User";
  id: string;
  name: string | null;
  avatar: string | null;
  role: UserRole;
  banned: boolean;
}

export interface getClipComments_clipComments {
  __typename: "ClipComment";
  id: string;
  content: string;
  clipId: string;
  authorId: string;
  author: getClipComments_clipComments_author;
  createdAt: string;
}

export interface getClipComments {
  clipComments: getClipComments_clipComments[];
}

export interface getClipCommentsVariables {
  clipId?: string | null;
}
