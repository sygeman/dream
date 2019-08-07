/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PostReactionType } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: postReaction
// ====================================================

export interface postReaction_postReaction {
  __typename: "PostReaction";
  id: string;
  type: PostReactionType;
  postId: string;
  userId: string;
}

export interface postReaction {
  postReaction: postReaction_postReaction;
}

export interface postReactionVariables {
  postId: string;
}
