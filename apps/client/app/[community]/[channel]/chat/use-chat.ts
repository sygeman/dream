import { ChannelMessage } from '@prisma/client';
import { pusher } from 'apps/client/libs/pusher-client';
import { useEffect, useState } from 'react';
import { CHANNEL_MESSAGE_CREATED } from './constants';

export const useChat = (messagesInit: ChannelMessage[], channelId: string) => {
  const [messages, setMessages] = useState<ChannelMessage[]>(messagesInit);

  useEffect(() => {
    pusher
      .subscribe(channelId)
      .bind(CHANNEL_MESSAGE_CREATED, (newMessage: ChannelMessage) => {
        setMessages((prevMessages) => {
          const messageIsExist = !!prevMessages.find(
            (message) => message.id === newMessage.id,
          );

          if (messageIsExist) return prevMessages;

          return [...prevMessages.slice(-50), newMessage];
        });
      });

    return () => pusher.unsubscribe(channelId);
  });

  return messages;
};
