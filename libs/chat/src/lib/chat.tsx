import React from 'react';
import { ChatMessage } from '@dream/components/chat-message';
import {
  useChatMessagesQuery,
  useChatMessageCreatedSubscription,
} from './types';
import { ChatBottom } from './bottom';

export const Chat: React.FC<{ chatId: string }> = ({ chatId }) => {
  const messagesQuery = useChatMessagesQuery({
    variables: { chatId },
  });

  useChatMessageCreatedSubscription({
    variables: { chatId },
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.data) return;

      const chatMessage = subscriptionData.data.chatMessageCreated;

      messagesQuery.updateQuery((prev) => {
        if (prev.chatMessages.findIndex((c) => c.id === chatMessage.id) < 0) {
          return {
            ...prev,
            chatMessages: [...prev.chatMessages.slice(-50), chatMessage],
          };
        }
      });
    },
  });

  const messages = messagesQuery.data?.chatMessages || [];

  return (
    <>
      <div className="flex flex-1 w-full overflow-hidden">
        <div className="flex flex-col w-full max-h-max overflow-y-auto py-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              username={message.author.name}
              content={message.content}
            />
          ))}
        </div>
      </div>

      <ChatBottom chatId={chatId} />
    </>
  );
};
