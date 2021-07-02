import { Story, Meta } from '@storybook/react';
import { SaveFormPanel, SaveFormPanelProps } from './';

export default {
  component: SaveFormPanel,
  title: 'SaveFormPanel',
} as Meta;

const Template: Story<SaveFormPanelProps> = (args) => (
  <SaveFormPanel {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  show: true,
  reset: () => null,
};
