import React from 'react';
import { Menu as MenuBox, MenuItem } from './';
import { Typography } from '../Typography';

export default {
  title: 'Components/Navigation',
};

export const Menu = () => {
  return (
    <MenuBox>
      <MenuItem>
        <Typography>Item 1</Typography>
      </MenuItem>
      <MenuItem>
        <Typography>Item 2</Typography>
      </MenuItem>
    </MenuBox>
  );
};
