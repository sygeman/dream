import gql from 'graphql-tag';
import { Component, FC } from 'react';
import { Query } from 'react-apollo';

export const GET_CLIP_COMMENTS = gql`
  query getClipComments($clipId: ID) {
    clipComments(clipId: $clipId) {
      id
      content
      clipId
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

const CLIP_COMMENT_CREATED = gql`
  subscription clipCommentCreated($clipId: ID!) {
    clipCommentCreated(clipId: $clipId) {
      id
      content
      clipId
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

const CLIP_COMMENT_REMOVED = gql`
  subscription clipCommentRemoved($clipId: ID!) {
    clipCommentRemoved(clipId: $clipId)
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
  clipId: string;
  children: any;
}

const Provider: FC<IProps> = ({ clipId, children }) => {
  const limit = 100;

  return (
    <Query
      query={GET_CLIP_COMMENTS}
      variables={{ clipId }}
      fetchPolicy="network-only"
    >
      {({ subscribeToMore, loading, error, data }) => {
        if (loading || error || !data) {
          return null;
        }

        return (
          <Inner
            comments={data.clipComments}
            created={() => {
              subscribeToMore({
                document: CLIP_COMMENT_CREATED,
                variables: { clipId },
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) {
                    return prev;
                  }

                  const newClipComment =
                    subscriptionData.data.clipCommentCreated;

                  const isDuplicate =
                    prev.clipComments.findIndex(c => {
                      return c.id === newClipComment.id;
                    }) >= 0;

                  if (isDuplicate) {
                    return prev;
                  }

                  return {
                    ...prev,
                    clipComments: [
                      ...prev.clipComments.slice(-limit),
                      newClipComment
                    ]
                  };
                }
              });
            }}
            deleted={() => {
              subscribeToMore({
                document: CLIP_COMMENT_REMOVED,
                variables: { clipId },
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) {
                    return prev;
                  }
                  const messageId = subscriptionData.data.clipCommentRemoved;
                  return {
                    ...prev,
                    clipComments: [
                      ...prev.clipComments.filter(message => {
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
