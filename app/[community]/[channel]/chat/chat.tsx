'use client';

import { type ChannelMessage } from '@prisma/client';

import { ChatBottom } from './bottom';
import { compactMessages } from './compact-messages';
import { ChatMessages } from './components/chat-messages';
import { formatedTenorGif } from './formated-tenor-gif';
import { useChat } from './use-chat';

type Properties = {
  channelId: string;
  messages: ChannelMessage[];
};

export const Chat = ({ channelId, messages: messagesInit }: Properties) => {
  const messages = useChat(messagesInit, channelId);

  return (
    <>
      <div className="flex flex-1 w-full overflow-hidden">
        <div className="flex flex-col w-full max-h-max overflow-y-auto py-4">
          {messages.length > 0 ? (
            <ChatMessages
              messages={compactMessages(messages).map((message: any) => ({
                authorName: message.user.name,
                authorAvatar: message.user.avatar,
                content: message.content,
                compact: message.compact,
                tenorGif: formatedTenorGif(message.tenorGif),
                createdAt: message.createdAt,
              }))}
            />
          ) : (
            <div className="flex flex-col flex-1 overflow-hidden relative h-full">
              {[...Array.from({ length: 20 }).keys()].map((index) => (
                <div
                  key={index}
                  className="flex shrink-0 rounded h-11 bg-zinc-900-dark mx-2 my-1 opacity-20 animate-pulse"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <ChatBottom channelId={channelId} />
    </>
  );
};
