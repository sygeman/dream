import React, { useRef } from 'react';
import styled from 'styled-components';
import { useCreateChatMessageMutation } from './types';
// import { useAccess } from 'src/hooks/useAccess';
// import { convertTextToEmojiCode } from 'src/utils/emoji';

const Box = styled.div`
  height: 60px;
  border-top: 1px solid transparent;
  display: flex;
  position: relative;
  input {
    width: calc(100% - 20px);
    padding: 0 30px 0 10px;
    height: 36px;
    color: #fff;
    background: #00000040;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    outline: none;
    margin: auto;
  }
`;

interface ChatMessagesBottomProps {
  chatId: string;
}

export const ChatMessagesBottom: React.FC<ChatMessagesBottomProps> = ({
  chatId,
}) => {
  const textInput = useRef<HTMLInputElement>(null);
  //   const [{ allow: isAllow }] = useAccess();
  const isAllow = true;
  let lock = false;

  const [createChatMessage] = useCreateChatMessageMutation({
    onCompleted: (data) => {
      if (data.createChatMessage && textInput.current) {
        textInput.current.value = '';
        lock = false;
      }
    },
  });

  return (
    <Box>
      <input
        autoFocus
        disabled={!isAllow}
        ref={textInput}
        maxLength={500}
        type="text"
        placeholder="Написать сообщение..."
        onKeyPress={(e) => {
          if (!textInput.current) {
            return null;
          }

          //   const text = convertTextToEmojiCode(textInput.current.value.trim());
          const text = textInput.current.value.trim();

          if (e.key === 'Enter' && !lock && text.length > 0) {
            lock = true;
            createChatMessage({
              variables: { input: { chatId, text } },
            });
          }
        }}
      />
    </Box>
  );
};
