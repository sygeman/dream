import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ChatMessages } from './';

export default {
  component: ChatMessages,
  title: 'ChatMessages',
  parameters: {
    layout: 'centered',
  },
} as Meta;

const Template: Story = () => {
  return (
    <div className="w-80 h-96 relative shadow-md bg-background rounded overflow-hidden">
      <ChatMessages />
    </div>
  );
};
export const Primary = Template.bind({});
Primary.args = {};
