import React from 'react';
import { Button, ButtonGroup } from './';

export default {
  title: 'Components/Button',
};

export const Simple = () => {
  return <Button>Test</Button>;
};

export const Group = () => {
  return (
    <ButtonGroup>
      <Button mainColor="twitch">Twitch</Button>
      <Button mainColor="vk">VK</Button>
      <Button mainColor="google">Google</Button>
    </ButtonGroup>
  );
};
