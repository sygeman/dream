import gql from 'graphql-tag';
import { FC, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import { ChatMessages } from './Messages';
import { ChatMessagesBottom } from './Bottom';

const GET_CHAT_MESSAGES = gql`
  query chatMessages($chatId: ID!) {
    chatMessages(chatId: $chatId) {
      id
      content
      authorId
      createdAt
      author {
        id
        name
        avatar
        role
      }
    }
  }
`;

const CHAT_MESSAGE_CREATED = gql`
  subscription chatMessageCreated($chatId: ID!) {
    chatMessageCreated(chatId: $chatId) {
      id
      content
      authorId
      createdAt
      author {
        id
        name
        avatar
        role
      }
    }
  }
`;

const CHAT_MESSAGE_DELETED = gql`
  subscription chatMessageDeleted($chatId: ID!) {
    chatMessageDeleted(chatId: $chatId) {
      id
      content
      authorId
      createdAt
      author {
        id
        name
        avatar
        role
      }
    }
  }
`;

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

interface IProps {
  id: string;
}

export const Chat: FC<IProps> = ({ id }) => {
  const limit = 50;
  const { subscribeToMore, loading, error, data } = useQuery(
    GET_CHAT_MESSAGES,
    { variables: { chatId: id }, ssr: false }
  );

  useEffect(() => {
    subscribeToMore({
      document: CHAT_MESSAGE_CREATED,
      variables: { chatId: id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const chatMessage = subscriptionData.data.chatMessageCreated;

        if (prev.chatMessages.findIndex(c => c.id === chatMessage.id) < 0) {
          return {
            ...prev,
            chatMessages: [...prev.chatMessages.slice(-limit), chatMessage]
          };
        }
      }
    });
  }, []);

  useEffect(() => {
    subscribeToMore({
      document: CHAT_MESSAGE_DELETED,
      variables: { chatId: id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const { id } = subscriptionData.data.chatMessageDeleted;

        return {
          ...prev,
          chatMessages: [...prev.chatMessages.filter(c => c.id !== id)]
        };
      }
    });
  }, []);

  if (loading || error || !data || !data.chatMessages) {
    return null;
  }

  return (
    <>
      <MessagesContainer>
        <ChatMessages messages={data.chatMessages} />
      </MessagesContainer>
      <ChatMessagesBottom chatId={id} />
    </>
  );
};
