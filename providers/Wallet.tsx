import gql from 'graphql-tag';
import { Component, FC } from 'react';
import { Query } from 'react-apollo';

const PROVIDER_KEY = 'wallet';

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

interface IPropsInner {
  data: any;
  updated: () => void;
  children: any;
}

class ProviderInner extends Component<IPropsInner> {
  public componentDidMount() {
    if (typeof this.props.updated === 'function') {
      this.props.updated();
    }
  }

  public render() {
    return this.props.children({
      data: this.props.data
    });
  }
}

interface IProps {
  where?: any;
  children: any;
}

const Provider: FC<IProps> = ({ children, where }) => (
  <Query query={GET} variables={{ where }}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading || error || !data || !data.wallet) {
        return children({ data: null });
      }

      return (
        <ProviderInner
          data={data[PROVIDER_KEY]}
          updated={() =>
            subscribeToMore({
              document: UPDATED,
              variables: { id: data[PROVIDER_KEY].id },
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                  return prev;
                }

                const updatedData = subscriptionData.data[PROVIDER_KEY];

                return {
                  ...prev,
                  [PROVIDER_KEY]: {
                    ...prev[PROVIDER_KEY],
                    ...updatedData
                  }
                };
              }
            })
          }
        >
          {children}
        </ProviderInner>
      );
    }}
  </Query>
);

export default Provider;
