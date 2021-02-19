import React, { useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { EmojiHappyIcon } from '@dream/icons/emoji-happy';
import { useCreateChannelMessageMutation } from './api';
import { convertTextToEmojiCode } from '@dream/utils/emoji';

interface ChatBottomProps {
  channelId: string;
}

export const ChatBottom: React.FC<ChatBottomProps> = ({ channelId }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  let lock = false;

  const [createMessage] = useCreateChannelMessageMutation({
    onCompleted: (data) => {
      if (data.createChannelMessage && textareaRef.current) {
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

          const content = convertTextToEmojiCode(
            textareaRef.current.value.trim()
          );

          if (e.key === 'Enter') {
            e.preventDefault();
          }

          if (e.key === 'Enter' && !lock && content.length > 0) {
            lock = true;
            createMessage({
              variables: { input: { channelId, content } },
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
