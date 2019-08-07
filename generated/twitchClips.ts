/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: twitchClips
// ====================================================

export interface twitchClips_twitchClips_pagination {
  __typename: "TwitchPagination";
  cursor: string | null;
}

export interface twitchClips_twitchClips_data {
  __typename: "TwitchClip";
  id: string;
  broadcaster_name: string;
  title: string;
  created_at: string;
  thumbnail_url: string;
  view_count: number;
}

export interface twitchClips_twitchClips {
  __typename: "TwitchClips";
  pagination: twitchClips_twitchClips_pagination;
  data: twitchClips_twitchClips_data[];
}

export interface twitchClips {
  twitchClips: twitchClips_twitchClips;
}

export interface twitchClipsVariables {
  broadcaster_id?: string | null;
  started_at?: string | null;
  first?: number | null;
}
