import React from 'react';
import { WithApollo } from '@dream/utils/apollo/WithApollo';
import { Chat as ChatContainer } from './chat';

export default {
  title: 'Containers/RavePro',
};

export const Chat = () => {
  return (
    <WithApollo>
      <ChatContainer chatId="ckjqa4tsg00008amaxie5r8vi" />
    </WithApollo>
  );
};
