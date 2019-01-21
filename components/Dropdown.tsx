import RCDropdown from 'rc-dropdown';
import { MouseEventHandler, FC } from 'react';

interface IProps {
  onClick?: MouseEventHandler<HTMLElement>;
  overlay: any;
}

const Dropdown: FC<IProps> = ({ children, overlay }) => (
  <RCDropdown trigger={['click']} overlay={overlay}>
    {children}
  </RCDropdown>
);

export default Dropdown;
