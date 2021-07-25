import React from 'react';
import { name } from 'faker';
import { Story, Meta } from '@storybook/react';
import { ChatMessages } from './';
import { useState } from '@storybook/addons';

export default {
  component: ChatMessages,
  title: 'ChatMessages',
  parameters: {
    layout: 'centered',
  },
} as Meta;

const Template: Story = () => {
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const [items, setItems] = useState([]);

  const loadNextPage = (...args) => {
    console.log('loadNextPage', ...args);

    setIsNextPageLoading(true);

    setTimeout(() => {
      setHasNextPage(items.length < 100);
      setIsNextPageLoading(false);
      setItems(
        [...items].concat(
          new Array(10).fill(true).map(() => ({ name: name.findName() }))
        )
      );
    }, 2500);
  };

  return (
    <div className="w-96 relative shadow-md bg-background rounded overflow-hidden">
      <ChatMessages
        hasNextPage={hasNextPage}
        isNextPageLoading={isNextPageLoading}
        items={items}
        loadNextPage={loadNextPage}
      />
    </div>
  );
};
export const Primary = Template.bind({});
Primary.args = {};
