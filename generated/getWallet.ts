/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { WalletWhereInput, CurrencyType } from "./globalTypes";

// ====================================================
// GraphQL query operation: getWallet
// ====================================================

export interface getWallet_wallet {
  __typename: "Wallet";
  id: string;
  balance: number;
  currency: CurrencyType;
}

export interface getWallet {
  wallet: getWallet_wallet;
}

export interface getWalletVariables {
  where: WalletWhereInput;
}
