import gql from 'graphql-tag';
import { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Comments from './Comments';
import MessagesBottom from './MessagesBottom';

export const GET_COMMENTS = gql`
  query($postId: ID) {
    comments(postId: $postId) {
      id
      text
      postId
      createdAt
      authorId
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
      createdAt
    }
  }
`;

const COMMENT_REMOVED = gql`
  subscription commentRemoved($postId: ID!) {
    commentRemoved(postId: $postId)
  }
`;

const USER_COMMENTS_REMOVED = gql`
  subscription userCommentsRemoved($postId: ID!) {
    userCommentsRemoved(postId: $postId)
  }
`;

const Chat = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const MessagesContainer = styled.div`
  display: flex;
  flex: 1;
`;

interface IProps {
  postId: string;
}

export default class extends Component<IProps> {
  public render() {
    const { postId } = this.props;
    const limit = 100;

    return (
      <Chat>
        <MessagesContainer>
          <Query
            query={GET_COMMENTS}
            variables={{ postId }}
            fetchPolicy="network-only"
          >
            {({ subscribeToMore, loading, error, data }) => {
              if (loading) {
                return <div />;
              }
              if (error) {
                return `Error! ${error.message}`;
              }

              return (
                <Comments
                  messages={data.comments}
                  subscribeNewChatMessages={() => {
                    subscribeToMore({
                      document: COMMENT_CREATED,
                      variables: { postId },
                      updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData.data) {
                          return prev;
                        }
                        const newMessage = subscriptionData.data.commentCreated;

                        if (
                          prev.comments.findIndex(
                            c => c.id === newMessage.id
                          ) >= 0
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
                  subscribeRemoveChatMessages={() => {
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
                  subscribeRemoveChatMessagesByUserId={() => {
                    subscribeToMore({
                      document: USER_COMMENTS_REMOVED,
                      variables: { postId },
                      updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData.data) {
                          return prev;
                        }
                        const userId =
                          subscriptionData.data.userCommentsRemoved;
                        return {
                          ...prev,
                          comments: [
                            ...prev.comments.filter(message => {
                              return message.authorId !== userId;
                            })
                          ]
                        };
                      }
                    });
                  }}
                />
              );
            }}
          </Query>
        </MessagesContainer>
        <MessagesBottom postId={postId} />
      </Chat>
    );
  }
}
