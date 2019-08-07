/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: communities
// ====================================================

export interface communities_communities {
  __typename: "Community";
  id: string;
  name: string;
  description: string | null;
  avatar: string | null;
}

export interface communities {
  communities: communities_communities[];
}
