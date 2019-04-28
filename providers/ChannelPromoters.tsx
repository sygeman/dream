import gql from 'graphql-tag';
import { Component, FC } from 'react';
import { Query } from 'react-apollo';

const GET_CHANNEL_PROMOTERS = gql`
  query channelPromoters {
    channelPromoters {
      id
    }
  }
`;

const CHANNEL_PROMOTER_CREATED = gql`
  subscription channelPromoterCreated {
    channelPromoterCreated {
      id
    }
  }
`;

const CHANNEL_PROMOTER_DELETED = gql`
  subscription channelPromoterDeleted {
    channelPromoterDeleted {
      id
    }
  }
`;

interface IPropsInner {
  created: () => void;
  deleted: () => void;
  channelPromoters: any;
  children: any;
}

class Inner extends Component<IPropsInner> {
  public componentDidMount() {
    this.props.created();
    this.props.deleted();
  }

  public render() {
    return this.props.children({
      channelPromoters: this.props.channelPromoters
    });
  }
}

interface IProps {
  where?: any;
  orderBy?: string;
  limit?: number;
  children: any;
}

const Provider: FC<IProps> = ({ children, limit }) => (
  <Query query={GET_CHANNEL_PROMOTERS}>
    {({ subscribeToMore, loading, error, data }) => {
      if (loading || error || !data || !data.channelPromoters) {
        return null;
      }

      return (
        <Inner
          channelPromoters={data.channelPromoters}
          created={() => {
            subscribeToMore({
              document: CHANNEL_PROMOTER_CREATED,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                  return prev;
                }

                const channelPromoter =
                  subscriptionData.data.channelPromoterCreated;

                if (
                  prev.channelPromoters.findIndex(
                    c => c.id === channelPromoter.id
                  ) < 0
                ) {
                  return {
                    ...prev,
                    channelPromoters: [
                      ...prev.channelPromoters.slice(-limit),
                      channelPromoter
                    ]
                  };
                }
              }
            });
          }}
          deleted={() => {
            subscribeToMore({
              document: CHANNEL_PROMOTER_DELETED,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                  return prev;
                }

                const { id } = subscriptionData.data.channelPromoterDeleted;

                return {
                  ...prev,
                  channelPromoters: [
                    ...prev.channelPromoters.filter(c => c.id !== id)
                  ]
                };
              }
            });
          }}
        >
          {children}
        </Inner>
      );
    }}
  </Query>
);

Provider.defaultProps = {
  limit: 50
};

export default Provider;
