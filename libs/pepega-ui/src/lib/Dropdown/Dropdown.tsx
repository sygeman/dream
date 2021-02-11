import React, { FC, MouseEventHandler } from 'react';
import RCDropdown from 'rc-dropdown';

interface IProps {
  onClick?: MouseEventHandler<HTMLElement>;
  overlay: React.ReactNode;
}

export const Dropdown: FC<IProps> = ({ children, overlay }) => (
  <RCDropdown trigger={['click']} overlay={overlay}>
    {children}
  </RCDropdown>
);
