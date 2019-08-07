/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: twitchUser
// ====================================================

export interface twitchUser_twitchUser {
  __typename: "TwitchUser";
  id: string;
  login: string;
  display_name: string;
  profile_image_url: string;
}

export interface twitchUser {
  twitchUser: twitchUser_twitchUser;
}

export interface twitchUserVariables {
  userId: string;
}
