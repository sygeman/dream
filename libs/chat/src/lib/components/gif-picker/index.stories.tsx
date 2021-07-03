import React from 'react';
import { Story, Meta } from '@storybook/react';
import { GifPicker, GifPickerProps } from './';

export default {
  component: GifPicker,
  title: 'GifPicker',
  parameters: {
    layout: 'centered',
  },
} as Meta;

const Template: Story<GifPickerProps> = (args) => (
  <div className="w-96 relative shadow-md bg-background rounded overflow-hidden">
    <GifPicker {...args} />
  </div>
);
export const Primary = Template.bind({});
Primary.args = {};
