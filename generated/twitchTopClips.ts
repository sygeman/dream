/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: twitchTopClips
// ====================================================

export interface twitchTopClips_twitchTopClips_thumbnails {
  __typename: "TwitchClipThumbnails";
  medium: string;
}

export interface twitchTopClips_twitchTopClips_broadcaster {
  __typename: "TwitchClipBroadcaster";
  display_name: string;
  logo: string;
}

export interface twitchTopClips_twitchTopClips {
  __typename: "TwitchClipOld";
  id: string;
  channel: string;
  title: string;
  createdAt: string;
  thumbnails: twitchTopClips_twitchTopClips_thumbnails;
  broadcaster: twitchTopClips_twitchTopClips_broadcaster;
  viewsCount: number;
}

export interface twitchTopClips {
  twitchTopClips: twitchTopClips_twitchTopClips[];
}

export interface twitchTopClipsVariables {
  game?: string | null;
  limit?: number | null;
}
