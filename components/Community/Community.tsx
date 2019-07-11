import styled from 'styled-components';
import { lighten } from 'polished';
import CommunityProvider from '../../providers/Community';
import ChatMessagesProvider from '../../providers/ChatMessages';
import { Chat } from '../Chat';

const Box = styled.div`
  display: flex;
  height: 100%;
`;

const ContentBox = styled.div`
  display: flex;
  flex: 1;
  padding: 20px;
`;

const ChatBox = styled.div`
  width: 320px;
  background: ${({ theme }) => lighten(0.03, theme.dark1Color)};
`;

export const Community = ({ id }) => {
  return (
    <CommunityProvider id={id}>
      {({ community }) => (
        <Box>
          <ContentBox>
            <div style={{ width: '100%' }}> </div>
          </ContentBox>
          <ChatBox>
            <ChatMessagesProvider chatId={community.mainChatId}>
              {({ chatMessages }) => (
                <Chat id={community.mainChatId} messages={chatMessages} />
              )}
            </ChatMessagesProvider>
          </ChatBox>
        </Box>
      )}
    </CommunityProvider>
  );
};
