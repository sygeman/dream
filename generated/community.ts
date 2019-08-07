/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: community
// ====================================================

export interface community_community {
  __typename: "Community";
  id: string;
  name: string;
  avatar: string | null;
  description: string | null;
  mainChatId: string;
}

export interface community {
  community: community_community;
}

export interface communityVariables {
  id: string;
}
