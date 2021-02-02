import { lighten, rgba } from 'polished';
import { FC } from 'react';
import styled from 'styled-components';

import { Menu as MenuIcon } from 'styled-icons/material/Menu';

const Box = styled.div`
  height: 42px;
  min-height: 42px;
  display: flex;
  padding: 0 10px;
  background: ${({ theme }) => rgba(theme.colors.surface, 0.9)};
`;

const MenuButton = styled.div`
  height: 100%;
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: ${({ theme }) => lighten(0.3, theme.colors.primary)};
  cursor: pointer;

  @media (min-width: 700px) {
    display: none;
  }
`;

interface IProps {
  leftMenuTrigger: () => void;
}

const TopNav: FC<IProps> = ({ leftMenuTrigger, children }) => {
  return (
    <Box>
      <MenuButton onClick={() => leftMenuTrigger()}>
        <MenuIcon size="20px" />
      </MenuButton>
      {children}
    </Box>
  );
};

export default TopNav;
