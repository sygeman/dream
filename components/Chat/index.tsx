import { useState } from 'react';
import styled from 'styled-components';
import { lighten } from 'polished';
import { ChatMessage } from './Message';
import { ChatMessages } from './Messages';
import { ChatMessagesBottom } from './Bottom';
import { Icon } from '../../ui';

const compactMessages = messages => {
  const compactInterval = 90e3; // 1,5 min

  return messages.map((message, index, array) => {
    let compact = false;

    if (index > 0) {
      const diff =
        parseInt(message.createdAt, 10) -
        parseInt(array[index - 1].createdAt, 10);

      if (
        diff < compactInterval &&
        message.authorId === array[index - 1].authorId
      ) {
        compact = true;
      }
    }

    return { ...message, compact };
  });
};

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

const ConnectionsCount = styled.div`
  display: flex;
  align-content: center;
  font-size: 12px;
  margin-left: 8px;
  height: 100%;
  min-width: 30px;
  font-weight: 500;
  justify-content: center;
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

const MessageContainer = styled.div``;

export const Chat = ({ id, messages }) => {
  const [tabActive, setActiveTab] = useState('messages');

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
            {/* <ConnectionsCount title={humanNumbers(online)}>
              {humanNumbers(online)}
            </ConnectionsCount> */}
          </TabBox>
        </Tab>
      </Tabs>

      <TabsContent>
        {tabActive === 'messages' && (
          <TabContent>
            <MessagesContainer>
              <ChatMessages messages={messages} />
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
