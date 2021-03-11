import React from 'react';
import {
  useChannelMessagesQuery,
  useChannelMessageCreatedSubscription,
} from '@dream/types';
import { ChatMessages } from './messages';
import { ChatBottom } from './bottom';

export const Chat: React.FC<{ channelId: string }> = ({ channelId }) => {
  const messagesQuery = useChannelMessagesQuery({
    variables: { channelId },
    skip: !channelId,
  });

  useChannelMessageCreatedSubscription({
    variables: { channelId },
    skip: !channelId,
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.data) return;

      const chatMessage = subscriptionData.data.channelMessageCreated;

      messagesQuery.updateQuery((prev) => {
        if (
          prev.channelMessages.findIndex((c) => c.id === chatMessage.id) < 0
        ) {
          return {
            ...prev,
            channelMessages: [...prev.channelMessages.slice(-50), chatMessage],
          };
        }
      });
    },
  });

  const messages = messagesQuery.data?.channelMessages || [];

  return (
    <>
      <div className="flex flex-1 w-full overflow-hidden">
        <div className="flex flex-col w-full max-h-max overflow-y-auto py-4">
          <ChatMessages messages={messages} />
        </div>
      </div>

      <ChatBottom channelId={channelId} />
    </>
  );
};
