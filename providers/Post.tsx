import gql from 'graphql-tag';
import { Component, FC } from 'react';
import { Query } from 'react-apollo';
import { getTokens } from '../lib/auth';

export const GET_POST = gql`
  query getPost($id: ID!) {
    post(id: $id) {
      id
      title
      nfws
      spoiler
      sourceId
      cover
      sourceType
      likes
      dislikes
      rating
      reaction
      createdAt
      channelName
      authorId
    }
  }
`;

const POST_REMOVED = gql`
  subscription postRemoved($id: ID!) {
    postRemoved(id: $id)
  }
`;

const POST_REACTION_CHANGED = gql`
  subscription postReactionChanged($id: ID!) {
    postReactionChanged(id: $id) {
      likes
      dislikes
      rating
      reaction
      userId
    }
  }
`;

interface IPropsInner {
  post: any;
  subscribePostRemoved: () => void;
  subscribePostReactionChanged: () => void;
  children: any;
}

class PostProviderInner extends Component<IPropsInner> {
  public componentDidMount() {
    this.props.subscribePostRemoved();
    this.props.subscribePostReactionChanged();
  }

  public render() {
    return this.props.children({
      post: this.props.post
    });
  }
}

interface IProps {
  id?: string;
  noRealtime?: boolean;
  children: any;
}

const PostProvider: FC<IProps> = ({ children, id, noRealtime }) => {
  return (
    <Query query={GET_POST} variables={{ id }}>
      {({ subscribeToMore, loading, error, data }) => {
        if (loading) {
          return null;
        }

        if (error) {
          return null;
        }

        if (noRealtime) {
          return children({
            post: data.post
          });
        }

        return (
          <PostProviderInner
            post={data.post}
            subscribePostRemoved={() => {
              subscribeToMore({
                document: POST_REMOVED,
                variables: { id },
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) {
                    return prev;
                  }

                  return {
                    ...prev,
                    post: null
                  };
                }
              });
            }}
            subscribePostReactionChanged={() => {
              subscribeToMore({
                document: POST_REACTION_CHANGED,
                variables: { id },
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) {
                    return prev;
                  }

                  // TODO: rethink
                  const token = getTokens().accessToken;
                  let currentId = null;

                  if (token) {
                    currentId = JSON.parse(atob(token.split('.')[1])).userId;
                  }

                  const reactionData =
                    subscriptionData.data.postReactionChanged;

                  return {
                    ...prev,
                    post: {
                      ...prev.post,
                      reaction:
                        reactionData.userId === currentId
                          ? reactionData.reaction
                          : prev.post.reaction,
                      likes: reactionData.likes,
                      dislikes: reactionData.dislikes,
                      rating: reactionData.rating
                    }
                  };
                }
              });
            }}
          >
            {children}
          </PostProviderInner>
        );
      }}
    </Query>
  );
};
export default PostProvider;
