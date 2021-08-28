import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ChatMessages } from './';
import { useEffect, useRef, useState, useCallback } from '@storybook/addons';
import { generateMessages } from './generate';

const START_INDEX = 10000;
const INITIAL_ITEM_COUNT = 20;

export default {
  component: ChatMessages,
  title: 'ChatMessages',
  parameters: {
    layout: 'centered',
  },
} as Meta;

const Template: Story = () => {
  const [firstItemIndex, setFirstItemIndex] = useState(START_INDEX);
  const [messages, setMessages] = useState([]);
  const appendInterval = useRef(null);

  useEffect(() => {
    const generate = async () => {
      const newMessages = await generateMessages(
        INITIAL_ITEM_COUNT,
        START_INDEX
      );
      setMessages(newMessages);
    };

    generate();

    appendInterval.current = setInterval(async () => {
      const newMessages = await generateMessages(1);
      setMessages((messages) => [...messages, ...newMessages]);
    }, 100);
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(appendInterval.current);
    };
  }, []);

  const loadPrevPage = useCallback(async () => {
    const nextFirstItemIndex = firstItemIndex - INITIAL_ITEM_COUNT;

    const newMessages = await generateMessages(
      INITIAL_ITEM_COUNT,
      nextFirstItemIndex
    );

    setMessages((messages) => [...newMessages, ...messages]);
    setFirstItemIndex(() => nextFirstItemIndex);

    return false;
  }, [firstItemIndex, messages, setMessages]);

  const loadNextPage = useCallback(async () => {
    const newMessages = await generateMessages(
      INITIAL_ITEM_COUNT,
      messages[messages.length - 1].index
    );

    setMessages((messages) => [...messages, ...newMessages]);

    return false;
  }, [messages, setMessages]);

  return (
    <div className="w-80 h-96 relative shadow-md bg-background rounded overflow-hidden">
      <ChatMessages
        messages={messages}
        // initialTopMostItemIndex={INITIAL_ITEM_COUNT - 1}
        // loadPrevPage={loadPrevPage}
        // loadNextPage={loadNextPage}
        // firstItemIndex={firstItemIndex}
      />
    </div>
  );
};
export const Primary = Template.bind({});
Primary.args = {};
