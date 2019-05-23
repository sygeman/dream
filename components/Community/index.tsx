import styled from 'styled-components';
import { lighten } from 'polished';
import ChatMessagesProvider from '../../providers/ChatMessages';
import { Chat } from '../Chat';

const Box = styled.div`
  display: flex;
  height: 100%;
`;

const ContentBox = styled.div`
  display: flex;
  flex: 1;
`;

const ChatBox = styled.div`
  width: 320px;
  background: ${({ theme }) => lighten(0.03, theme.dark1Color)};
`;

export const Community = ({ id, name, mainChatId, avatar }) => {
  return (
    <Box>
      <ContentBox>{name}</ContentBox>
      <ChatBox>
        <ChatMessagesProvider chatId={mainChatId}>
          {({ chatMessages }) => (
            <Chat id={mainChatId} messages={chatMessages} />
          )}
        </ChatMessagesProvider>
      </ChatBox>
    </Box>
  );
};
