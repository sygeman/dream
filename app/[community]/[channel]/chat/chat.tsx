'use client';

import { ChatMessages } from './components/chat-messages';
import { ChatBottom } from './bottom';
import { compactMessages } from './compact-messages';
import { formatedTenorGif } from './formated-tenor-gif';
import { type ChannelMessage } from '@prisma/client';
import { useChat } from './use-chat';

type Props = {
  channelId: string;
  messages: ChannelMessage[];
};

export const Chat = ({ channelId, messages: messagesInit }: Props) => {
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
              {[...Array(20).keys()].map((i) => (
                <div
                  key={i}
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
