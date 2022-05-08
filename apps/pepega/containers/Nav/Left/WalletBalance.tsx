import gql from 'graphql-tag';
import React, { FC, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { shortNumbers, humanNumbers } from '../../../utils/count';

const GET_WALLET = gql`
  query getWallet($where: WalletWhereInput!) {
    wallet(where: $where) {
      id
      balance
      currency
    }
  }
`;

const UPDATED_WALLET = gql`
  subscription wallet($id: ID!) {
    wallet(id: $id) {
      id
      balance
      currency
    }
  }
`;

interface IProps {
  currency: string;
}

export const WalletBalance: FC<IProps> = ({ currency }) => {
  const { loading, error, data, subscribeToMore } = useQuery(GET_WALLET, {
    variables: { where: { currency } },
  });

  useEffect(() => {
    if (data && data.wallet) {
      subscribeToMore({
        document: UPDATED_WALLET,
        variables: { id: data.wallet.id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev;
          }

          const updatedData = subscriptionData.data.wallet;

          return {
            ...prev,
            wallet: {
              ...prev.wallet,
              ...updatedData,
            },
          };
        },
      });
    }
  }, [loading]);

  const wallet = loading || error || !data || !data.wallet ? null : data.wallet;

  return (
    <span title={humanNumbers(wallet ? wallet.balance : 0)}>
      {shortNumbers(wallet ? wallet.balance : 0)}
    </span>
  );
};
