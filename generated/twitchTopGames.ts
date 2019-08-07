/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: twitchTopGames
// ====================================================

export interface twitchTopGames_twitchTopGames {
  __typename: "TwitchGame";
  id: string;
  name: string;
  box_art_url: string;
}

export interface twitchTopGames {
  twitchTopGames: twitchTopGames_twitchTopGames[];
}

export interface twitchTopGamesVariables {
  first?: number | null;
}
