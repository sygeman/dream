/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: channelsTop
// ====================================================

export interface channelsTop_channelsTop {
  __typename: "Channel";
  id: string;
  cost: number;
  name: string;
  title: string | null;
  avatar: string | null;
}

export interface channelsTop {
  channelsTop: channelsTop_channelsTop[];
}
