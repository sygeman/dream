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
    <div className="flex flex-col overflow-hidden flex-1 relative">
      <SimpleBar ref={ref} className="h-full">
        {compactMessages(messages).map((message) => (
          <ChatMessage
            key={message.id}
            username={message.author.name}
            content={message.content}
          />
        ))}
      </SimpleBar>
      {!isBottom && (
        <div
          className={clsx(
            'absolute bottom-0',
            'flex w-full items-center justify-center',
            'text-white text-sm',
            'bg-surface',
            'opacity-90   cursor-pointer'
          )}
          onClick={toBottom}
        >
          Chat Paused Due to Scroll
        </div>
      )}
    </div>
  );
};
