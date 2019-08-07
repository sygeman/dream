/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CurrencyType } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: wallet
// ====================================================

export interface wallet_wallet {
  __typename: "Wallet";
  id: string;
  balance: number;
  currency: CurrencyType;
}

export interface wallet {
  wallet: wallet_wallet;
}

export interface walletVariables {
  id: string;
}
