/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: channel
// ====================================================

export interface channel_channel {
  __typename: "Channel";
  id: string;
  name: string;
  title: string | null;
  avatar: string | null;
  live: boolean;
  cost: number;
}

export interface channel {
  channel: channel_channel;
}

export interface channelVariables {
  id: string;
}
