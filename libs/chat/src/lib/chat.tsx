import React from 'react';
import styled from 'styled-components';
import {
  useChatMessagesQuery,
  useChatMessageCreatedSubscription,
} from './types';
import { Flex, Typography } from '@dream/ui';
import { ChatMessagesBottom } from './Bottom';

const Box = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.dark2};
`;

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
    <Box>
      {messages.map((message) => (
        <Flex key={message.id} p="4px">
          <Typography mr="4px" color="accent2">
            {message.author.name}:
          </Typography>
          <Typography>{message.content}</Typography>
        </Flex>
      ))}
      <ChatMessagesBottom chatId={chatId} />
    </Box>
  );
};
