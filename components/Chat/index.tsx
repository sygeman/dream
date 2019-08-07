import gql from 'graphql-tag';
import { useState, FC, useEffect } from 'react';
import { useQuery } from 'react-apollo';
import styled from 'styled-components';
import { lighten } from 'polished';
import { ChatMessages } from './Messages';
import { ChatMessagesBottom } from './Bottom';
import { Icon } from '../../ui';

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

const Box = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Tabs = styled.div`
  display: flex;
  min-height: 44px;
  border-bottom: 1px solid transparent;
`;

interface ITab {
  isActive: boolean;
}

const Tab = styled('div')<ITab>`
  display: flex;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  color: ${({ isActive, theme }) =>
    isActive ? lighten('0.2', theme.accent2Color) : theme.accent2Color};
  align-items: center;
  justify-content: center;
`;

const TabBox = styled.div`
  display: flex;
  font-size: 14px;
`;

const TabsContent = styled.div`
  height: 100%;
  overflow: hidden;
`;
const TabContent = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  overflow: hidden;
`;

interface IProps {
  id: string;
}

export const Chat: FC<IProps> = ({ id }) => {
  const limit = 50;
  const [tabActive, setActiveTab] = useState('messages');
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
    <Box>
      <Tabs>
        <Tab
          onClick={() => setActiveTab('messages')}
          isActive={tabActive === 'messages'}
        >
          <TabBox>
            <Icon type="comments" />
          </TabBox>
        </Tab>
        <Tab
          onClick={() => setActiveTab('users')}
          isActive={tabActive === 'users'}
        >
          <TabBox>
            <Icon type="accounts" />
          </TabBox>
        </Tab>
      </Tabs>

      <TabsContent>
        {tabActive === 'messages' && (
          <TabContent>
            <MessagesContainer>
              <ChatMessages messages={data.chatMessages} />
            </MessagesContainer>
            <ChatMessagesBottom chatId={id} />
          </TabContent>
        )}
        {tabActive === 'users' && (
          <TabContent>{/* <Users communityId={communityId} /> */}</TabContent>
        )}
      </TabsContent>
    </Box>
  );
};
