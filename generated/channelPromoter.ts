/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: channelPromoter
// ====================================================

export interface channelPromoter_channelPromoter {
  __typename: "ChannelPromoter";
  id: string;
  active: boolean;
  cost: number;
  channelId: string;
}

export interface channelPromoter {
  channelPromoter: channelPromoter_channelPromoter;
}

export interface channelPromoterVariables {
  id: string;
}
