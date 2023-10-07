import { ChannelMessage } from '@prisma/client';
import { useEffect, useState } from 'react';

import { pusher } from '@/libs/pusher-client';

import { CHANNEL_MESSAGE_CREATED } from './constants';

export const useChat = (messagesInit: ChannelMessage[], channelId: string) => {
  const [messages, setMessages] = useState<ChannelMessage[]>(messagesInit);

  useEffect(() => {
    pusher
      .subscribe(channelId)
      .bind(CHANNEL_MESSAGE_CREATED, (newMessage: ChannelMessage) => {
        setMessages((previousMessages) => {
          const messageIsExist = !!previousMessages.some(
            (message) => message.id === newMessage.id
          );

          if (messageIsExist) return previousMessages;

          return [...previousMessages.slice(-50), newMessage];
        });
      });

    return () => pusher.unsubscribe(channelId);
  });

  return messages;
};
