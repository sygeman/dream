import gql from 'graphql-tag';
import { Component, FC } from 'react';
import { Query } from 'react-apollo';

const GET = gql`
  query channelPromoter($where: ChannelPromoterWhereUniqueInput!) {
    channelPromoter(where: $where) {
      id
      active
      cost
      channelId
    }
  }
`;

const UPDATED = gql`
  subscription channelPromoter($id: ID!) {
    channelPromoter(id: $id) {
      id
      active
      cost
      channelId
    }
  }
`;

interface IPropsInner {
  channelPromoter: any;
  updated: () => void;
  children: any;
}

class ProviderInner extends Component<IPropsInner> {
  public componentDidMount() {
    this.props.updated();
  }

  public render() {
    return this.props.children({
      channelPromoter: this.props.channelPromoter
    });
  }
}

interface IProps {
  id?: string;
}

const Provider: FC<IProps> = ({ children, id = '' }) => (
  <Query query={GET} variables={{ where: { id } }}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading || error) {
        return null;
      }

      return (
        <ProviderInner
          channelPromoter={data.channelPromoter}
          updated={() => {
            subscribeToMore({
              document: UPDATED,
              variables: { id },
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                  return prev;
                }

                return {
                  ...prev,
                  channelPromoter: {
                    ...prev.channelPromoter,
                    ...subscriptionData.data.channelPromoter
                  }
                };
              }
            });
          }}
        >
          {children}
        </ProviderInner>
      );
    }}
  </Query>
);

export default Provider;
