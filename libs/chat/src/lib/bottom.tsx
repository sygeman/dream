import React, { useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { EmojiHappyIcon } from '@dream/icons/emoji-happy';
import { useCreateChatMessageMutation } from './api';
import { convertTextToEmojiCode } from '@dream/utils/emoji';

interface ChatBottomProps {
  chatId: string;
}

export const ChatBottom: React.FC<ChatBottomProps> = ({ chatId }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  //   const [{ allow: isAllow }] = useAccess();
  const isAllow = true;
  let lock = false;

  const [createChatMessage] = useCreateChatMessageMutation({
    onCompleted: (data) => {
      if (data.createChatMessage && textareaRef.current) {
        textareaRef.current.value = '';
        lock = false;
      }
    },
  });

  return (
    <div className="flex relative">
      <TextareaAutosize
        ref={textareaRef}
        maxLength={500}
        maxRows={3}
        placeholder="Send a message"
        className="bg-background text-text text-xs resize-none mx-2 mb-4 p-2 rounded w-full focus:outline-none focus:ring-1"
        onKeyPress={(e) => {
          if (!textareaRef.current) {
            return null;
          }

          const text = convertTextToEmojiCode(textareaRef.current.value.trim());
          // const text = textareaRef.current.value.trim();

          if (e.key === 'Enter') {
            e.preventDefault();
          }

          if (e.key === 'Enter' && !lock && text.length > 0) {
            lock = true;
            createChatMessage({
              variables: { input: { chatId, text } },
            });
          }
        }}
      />
      <div className="flex absolute right-4 bottom-6">
        <EmojiHappyIcon />
      </div>
    </div>
  );
};
