import React from 'react';
import { useChatMessagesQuery, useChatMessageCreatedSubscription } from './api';
import { ChatBottom } from './bottom';
import { ChatMessages } from './messages';

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
          <ChatMessages messages={messages} />
        </div>
      </div>

      <ChatBottom chatId={chatId} />
    </>
  );
};
