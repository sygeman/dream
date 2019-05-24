import styled from 'styled-components';
import { lighten } from 'polished';
import ChatMessagesProvider from '../../providers/ChatMessages';
import { Chat } from '../Chat';
import { Rectangle169 } from '../../ui';

const Box = styled.div`
  display: flex;
  height: 100%;
`;

const ContentBox = styled.div`
  display: flex;
  flex: 1;
  padding: 20px;
`;

const PlayerBox = styled.div`
  background: ${({ theme }) => lighten(0.03, theme.dark1Color)};
  height: 100%;
  width: 100%;
`;

const ChatBox = styled.div`
  width: 320px;
  background: ${({ theme }) => lighten(0.03, theme.dark1Color)};
`;

const PlayerIframe = styled.iframe`
  height: 100%;
  width: 100%;
  border: none;
`;

export const Community = ({ mainChatId }) => {
  return (
    <Box>
      <ContentBox>
        <div style={{ width: '100%' }}>
          <Rectangle169>
            <PlayerBox>
              <PlayerIframe src="https://www.youtube.com/embed/Z4OhbzSFpnk?autoplay=1&loop=1&playlist=Z4OhbzSFpnk" />
            </PlayerBox>
          </Rectangle169>
        </div>
      </ContentBox>
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
