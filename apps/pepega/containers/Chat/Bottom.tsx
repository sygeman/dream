import styled from 'styled-components';
import { FC, useRef } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useAccess } from '@pepega/utils/useAccess';
import { convertTextToEmojiCode } from '@pepega/utils/emoji';

const CREATE_CHAT_MESSAGE = gql`
  mutation createChatMessage($input: ChatMessageCreateInput!) {
    createChatMessage(input: $input)
  }
`;

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

interface IProps {
  chatId: string;
}

export const ChatMessagesBottom: FC<IProps> = ({ chatId }) => {
  const textInput = useRef<HTMLInputElement>(null);
  const [{ allow: isAllow }] = useAccess();
  let lock = false;

  const [createChatMessage] = useMutation(CREATE_CHAT_MESSAGE, {
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

          const text = convertTextToEmojiCode(textInput.current.value.trim());

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
