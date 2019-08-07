import gql from 'graphql-tag';
import { FC, useEffect } from 'react';
import { useQuery } from 'react-apollo';

const GET = gql`
  query getWallet($where: WalletWhereInput!) {
    wallet(where: $where) {
      id
      balance
      currency
    }
  }
`;

const UPDATED = gql`
  subscription wallet($id: ID!) {
    wallet(id: $id) {
      id
      balance
      currency
    }
  }
`;

interface IProps {
  where?: any;
  children: any;
}

const Provider: FC<IProps> = ({ children, where }) => {
  const { loading, error, data, subscribeToMore } = useQuery(GET, {
    variables: { where }
  });

  useEffect(() => {
    if (data && data.wallet) {
      subscribeToMore({
        document: UPDATED,
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
              ...updatedData
            }
          };
        }
      });
    }
  }, [loading]);

  return children({
    data: loading || error || !data || !data.wallet ? null : data.wallet
  });
};

export default Provider;
