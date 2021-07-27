import React, { useCallback } from 'react';
import { Story, Meta } from '@storybook/react';
import { ChatMessages } from './';
import { useEffect, useState } from '@storybook/addons';
import { generateUsers } from './generate';

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
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const generate = async () => {
      const newUsers = await generateUsers(INITIAL_ITEM_COUNT, START_INDEX);
      setUsers(newUsers);
    };

    generate();
  }, []);

  const loadPrevPage = useCallback(async () => {
    const nextFirstItemIndex = firstItemIndex - INITIAL_ITEM_COUNT;

    const newUsers = await generateUsers(
      INITIAL_ITEM_COUNT,
      nextFirstItemIndex
    );

    setUsers(() => [...newUsers, ...users]);

    setFirstItemIndex(() => nextFirstItemIndex);

    return false;
  }, [firstItemIndex, users, setUsers]);

  const loadNextPage = useCallback(async () => {
    const newUsers = await generateUsers(
      INITIAL_ITEM_COUNT,
      users[users.length - 1].index
    );

    setUsers(() => [...users, ...newUsers]);

    return false;
  }, [users, setUsers]);

  return (
    <div className="w-80 h-96 relative shadow-md bg-background rounded overflow-hidden">
      <ChatMessages
        items={users}
        initialTopMostItemIndex={INITIAL_ITEM_COUNT - 1}
        loadPrevPage={loadPrevPage}
        loadNextPage={loadNextPage}
        firstItemIndex={firstItemIndex}
      />
    </div>
  );
};
export const Primary = Template.bind({});
Primary.args = {};
