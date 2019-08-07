/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUser
// ====================================================

export interface getUser_user {
  __typename: "User";
  id: string;
  name: string | null;
  avatar: string | null;
}

export interface getUser {
  user: getUser_user | null;
}

export interface getUserVariables {
  id?: string | null;
}
