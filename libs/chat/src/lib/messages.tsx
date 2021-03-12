import React from 'react';
import clsx from 'clsx';
import SimpleBar from 'simplebar-react';
import { ChatMessage } from './components/chat-message';
import { useChatScroll } from './useChatScroll';
import { compactMessages } from './compactMessages';

export const ChatMessages: React.FC<{ messages: any[] }> = ({ messages }) => {
  const { ref, isBottom, toBottom } = useChatScroll({
    updateTriggers: [messages[messages.length - 1]?.id],
  });

  return (
    <div className="flex flex-col flex-1 overflow-hidden relative">
      <SimpleBar ref={ref} className="h-full">
        {compactMessages(messages).map((message) => (
          <ChatMessage
            key={message.id}
            authorName={message.user.name}
            authorAvatar={message.user.avatar}
            content={message.content}
            compact={message.compact}
            createdAt={message.createdAt}
          />
        ))}
      </SimpleBar>
      {!isBottom && (
        <div
          className={clsx(
            'absolute bottom-0',
            'flex w-full items-center justify-center',
            'text-white text-sm',
            'bg-gray-800',
            'opacity-90 cursor-pointer'
          )}
          onClick={toBottom}
        >
          Chat Paused Due to Scroll
        </div>
      )}
    </div>
  );
};
