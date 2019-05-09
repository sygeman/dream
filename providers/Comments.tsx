import gql from 'graphql-tag';
import { Component, FC } from 'react';
import { Query } from 'react-apollo';

export const GET_COMMENTS = gql`
  query getComments($postId: ID) {
    comments(postId: $postId) {
      id
      text
      postId
      authorId
      author {
        id
        name
        avatar
        role
        banned
      }
      createdAt
    }
  }
`;

const COMMENT_CREATED = gql`
  subscription commentCreated($postId: ID!) {
    commentCreated(postId: $postId) {
      id
      text
      postId
      authorId
      author {
        id
        name
        avatar
        role
        banned
      }
      createdAt
    }
  }
`;

const COMMENT_REMOVED = gql`
  subscription commentRemoved($postId: ID!) {
    commentRemoved(postId: $postId)
  }
`;

interface IPropsInner {
  created: () => void;
  deleted: () => void;
  comments: any;
  children: any;
}

class Inner extends Component<IPropsInner> {
  public componentDidMount() {
    this.props.created();
    this.props.deleted();
  }

  public render() {
    return this.props.children({
      comments: this.props.comments
    });
  }
}

interface IProps {
  postId: string;
  children: any;
}

const Provider: FC<IProps> = ({ postId, children }) => {
  const limit = 100;

  return (
    <Query
      query={GET_COMMENTS}
      variables={{ postId }}
      fetchPolicy="network-only"
    >
      {({ subscribeToMore, loading, error, data }) => {
        if (loading || error || !data) {
          return null;
        }

        return (
          <Inner
            comments={data.comments}
            created={() => {
              subscribeToMore({
                document: COMMENT_CREATED,
                variables: { postId },
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) {
                    return prev;
                  }
                  const newMessage = subscriptionData.data.commentCreated;

                  if (
                    prev.comments.findIndex(c => c.id === newMessage.id) >= 0
                  ) {
                    return prev;
                  }

                  return {
                    ...prev,
                    comments: [...prev.comments.slice(-limit), newMessage]
                  };
                }
              });
            }}
            deleted={() => {
              subscribeToMore({
                document: COMMENT_REMOVED,
                variables: { postId },
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) {
                    return prev;
                  }
                  const messageId = subscriptionData.data.commentRemoved;
                  return {
                    ...prev,
                    comments: [
                      ...prev.comments.filter(message => {
                        return message.id !== messageId;
                      })
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
};

export default Provider;
