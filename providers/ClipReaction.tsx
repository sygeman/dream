import gql from 'graphql-tag';
import { Component, FC } from 'react';
import { Query } from 'react-apollo';

const GET = gql`
  query clipReaction($clipId: ID!) {
    clipReaction(clipId: $clipId) {
      id
      type
      clipId
      userId
    }
  }
`;

const UPDATED = gql`
  subscription clipReaction($clipId: ID!) {
    clipReaction(clipId: $clipId) {
      id
      type
      clipId
      userId
    }
  }
`;

interface IPropsInner {
  clipReaction: any;
  updated: () => void;
  children: any;
}

class ProviderInner extends Component<IPropsInner> {
  public componentDidMount() {
    this.props.updated();
  }

  public render() {
    return this.props.children({
      clipReaction: this.props.clipReaction
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
          clipReaction={data.clipReaction}
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
                  clipReaction: {
                    ...prev.clipReaction,
                    ...subscriptionData.data.clipReaction
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
