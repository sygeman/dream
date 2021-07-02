import React from 'react';
import { Story, Meta } from '@storybook/react';
import { GifMenu, GifMenuProps } from './gifs';

export default {
  component: GifMenu,
  title: 'GifMenu',
  parameters: {
    layout: 'centered',
  },
} as Meta;

const Template: Story<GifMenuProps> = (args) => (
  <div className="w-96 h-96 relative">
    <GifMenu {...args} />
  </div>
);
export const Primary = Template.bind({});
Primary.args = {};
