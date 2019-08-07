/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CommunityCreateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createCommunity
// ====================================================

export interface createCommunity_createCommunity {
  __typename: "Community";
  id: string;
}

export interface createCommunity {
  createCommunity: createCommunity_createCommunity;
}

export interface createCommunityVariables {
  input: CommunityCreateInput;
}
