import gql from 'graphql-tag';
import { Component, FC } from 'react';
import { Query } from 'react-apollo';

const GET = gql`
  query clipReactionStats($clipId: ID!) {
    clipReactionStats(clipId: $clipId) {
      id
      likes
      dislikes
      rating
    }
  }
`;

const UPDATED = gql`
  subscription clipReactionStats($clipId: ID!) {
    clipReactionStats(clipId: $clipId) {
      id
      likes
      dislikes
      rating
    }
  }
`;

interface IPropsInner {
  clipReactionStats: any;
  updated: () => void;
  children: any;
}

class ProviderInner extends Component<IPropsInner> {
  public componentDidMount() {
    this.props.updated();
  }

  public render() {
    return this.props.children({
      clipReactionStats: this.props.clipReactionStats
    });
  }
}

interface IProps {
  clipId: string;
}

const Provider: FC<IProps> = ({ children, clipId }) => (
  <Query query={GET} variables={{ clipId }} ssr={false}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading || error || !data) {
        return null;
      }

      return (
        <ProviderInner
          clipReactionStats={data.clipReactionStats}
          updated={() => {
            subscribeToMore({
              document: UPDATED,
              variables: { clipId },
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                  return prev;
                }

                return {
                  ...prev,
                  clipReactionStats: {
                    ...prev.clipReactionStats,
                    ...subscriptionData.data.clipReactionStats
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
