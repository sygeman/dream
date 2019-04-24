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

const CHANNEL_SUPPORTER_SUB = gql`
  subscription channelSupporter($where: channelPromotersubscriptionWhereInput) {
    channelSupporter(where: $where) {
      mutation
      previousValues {
        id
      }
      node {
        id
      }
    }
  }
`;

interface IPropsInner {
  subscribeNew: () => void;
  channelPromoters: any;
  children: any;
}

class Inner extends Component<IPropsInner> {
  public componentDidMount() {
    this.props.subscribeNew();
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

const Provider: FC<IProps> = ({ where, orderBy, children, limit }) => (
  <Query query={GET_CHANNEL_PROMOTERS}>
    {({ subscribeToMore, loading, error, data }) => {
      if (loading || error || !data || !data.channelPromoters) {
        return null;
      }

      const subVariables: any = {
        where: { node: where }
      };

      return (
        <Inner
          channelPromoters={data.channelPromoters}
          subscribeNew={() => {
            subscribeToMore({
              document: CHANNEL_SUPPORTER_SUB,
              variables: subVariables,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                  return prev;
                }

                const {
                  mutation,
                  node,
                  previousValues
                } = subscriptionData.data.channelSupporter;

                switch (mutation) {
                  case 'CREATED':
                    if (
                      prev.channelPromoters.findIndex(c => c.id === node.id) < 0
                    ) {
                      return {
                        ...prev,
                        channelPromoters: [
                          ...prev.channelPromoters.slice(-limit),
                          node
                        ]
                      };
                    }
                    break;
                  case 'DELETED':
                    return {
                      ...prev,
                      channelPromoters: [
                        ...prev.channelPromoters.filter(
                          c => c.id !== previousValues.id
                        )
                      ]
                    };
                  default:
                    return prev;
                }
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
