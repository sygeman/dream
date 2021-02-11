import RCDropdown from 'rc-dropdown';
import { FC, MouseEventHandler } from 'react';

interface IProps {
  onClick?: MouseEventHandler<HTMLElement>;
  overlay: React.ReactNode;
}

export const Dropdown: FC<IProps> = ({ children, overlay }) => (
  <RCDropdown trigger={['click']} overlay={overlay}>
    {children}
  </RCDropdown>
);
