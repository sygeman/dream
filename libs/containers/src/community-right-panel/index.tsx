import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { AnnotationIcon } from '@dream/icons/annotation';
import { UsersIcon } from '@dream/icons/users';
import { EmojiHappyIcon } from '@dream/icons/emoji-happy';
import { ChatMessage } from '@dream/components/chat-message';

const Chat = () => {
  return (
    <>
      <div className="flex flex-1 w-full overflow-hidden">
        <div className="flex flex-col w-full max-h-max overflow-y-auto py-4">
          {[...Array(50).keys()].map((k) => (
            <ChatMessage key={k} username="user" content={`message ${k}`} />
          ))}
        </div>
      </div>

      <div className="flex relative">
        <TextareaAutosize
          maxRows={3}
          placeholder="Send a message"
          className="bg-background text-text text-xs resize-none mx-2 mb-4 p-2 rounded w-full focus:outline-none focus:ring-1"
        />
        <div className="flex absolute right-4 bottom-6">
          <EmojiHappyIcon />
        </div>
      </div>
    </>
  );
};

export const CommunityRightPanel = () => {
  return (
    <div className="h-screen flex flex-col w-320px bg-surface">
      <div className="flex border-b border-background">
        <div className="flex flex-1 justify-center px-4 py-2 bg-surface">
          <span className="text-text text-sm">
            <AnnotationIcon />
          </span>
        </div>
        <div className="flex flex-1 justify-center px-4 py-2 bg-surface">
          <span className="text-text text-sm">
            <UsersIcon />
          </span>
        </div>
      </div>
      <Chat />
    </div>
  );
};
