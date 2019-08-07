/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: twitchGame
// ====================================================

export interface twitchGame_twitchGame {
  __typename: "TwitchGame";
  id: string;
  name: string;
  box_art_url: string;
}

export interface twitchGame {
  twitchGame: twitchGame_twitchGame[];
}

export interface twitchGameVariables {
  id?: string | null;
}
