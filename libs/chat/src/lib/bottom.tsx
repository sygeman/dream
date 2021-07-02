import React, { useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useCreateChannelMessageMutation } from '@dream/types';
import { convertTextToEmojiCode } from '@dream/utils/emoji';
import { GifMenu } from './gifs';

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

  const sendMessage = () => {
    const content = convertTextToEmojiCode(textareaRef.current.value.trim());

    if (!lock && content.length > 0) {
      lock = true;
      createMessage({
        variables: { input: { channelId, content } },
      });
    }
  };

  return (
    <div className="px-2">
      <div className="flex relative">
        <TextareaAutosize
          ref={textareaRef}
          maxLength={500}
          maxRows={3}
          placeholder="Send a message"
          className="bg-background text-white text-xs resize-none p-2 rounded w-full focus:outline-none focus:ring-1"
          onKeyPress={(e) => {
            if (!textareaRef.current) {
              return null;
            }

            if (e.key === 'Enter') {
              e.preventDefault();
              sendMessage();
            }
          }}
        />

        <GifMenu
          onSelect={(content) => {
            createMessage({
              variables: { input: { channelId, content } },
            });
          }}
        />
      </div>
      <div className="flex justify-end my-2">
        <button className="btn btn-primary" onClick={sendMessage}>
          Chat
        </button>
      </div>
    </div>
  );
};
