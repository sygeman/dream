/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: twitchFollows
// ====================================================

export interface twitchFollows_twitchFollows_data {
  __typename: "TwitchFollowData";
  to_name: string;
  to_id: string;
}

export interface twitchFollows_twitchFollows_pagination {
  __typename: "TwitchPagination";
  cursor: string | null;
}

export interface twitchFollows_twitchFollows {
  __typename: "TwitchFollows";
  total: number;
  data: twitchFollows_twitchFollows_data[];
  pagination: twitchFollows_twitchFollows_pagination;
}

export interface twitchFollows {
  twitchFollows: twitchFollows_twitchFollows;
}

export interface twitchFollowsVariables {
  after?: string | null;
  first?: number | null;
}
