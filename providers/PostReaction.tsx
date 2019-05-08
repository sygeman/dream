import gql from 'graphql-tag';
import { Component, FC } from 'react';
import { Query } from 'react-apollo';

const GET = gql`
  query postReaction($postId: ID!) {
    postReaction(postId: $postId) {
      id
      type
      postId
      userId
    }
  }
`;

const UPDATED = gql`
  subscription postReaction($postId: ID!) {
    postReaction(postId: $postId) {
      id
      type
      postId
      userId
    }
  }
`;

interface IPropsInner {
  postReaction: any;
  updated: () => void;
  children: any;
}

class ProviderInner extends Component<IPropsInner> {
  public componentDidMount() {
    this.props.updated();
  }

  public render() {
    return this.props.children({
      postReaction: this.props.postReaction
    });
  }
}

interface IProps {
  postId: string;
}

const Provider: FC<IProps> = ({ children, postId }) => (
  <Query query={GET} variables={{ postId }} ssr={false}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading || error || !data) {
        return null;
      }

      return (
        <ProviderInner
          postReaction={data.postReaction}
          updated={() => {
            subscribeToMore({
              document: UPDATED,
              variables: { postId },
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                  return prev;
                }

                return {
                  ...prev,
                  postReaction: {
                    ...prev.postReaction,
                    ...subscriptionData.data.postReaction
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
