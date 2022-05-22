import { darken, lighten } from 'polished';
import { FC } from 'react';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  background: ${({ theme }) => darken(0.01, '#262841')};
  min-height: 42px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 20px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const UserAvatar = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 0 10px;
`;

const UserAvatarImg = styled.img`
  height: 34px;
  width: 34px;
  border-radius: 100%;
  overflow: hidden;
`;

const UserName = styled.div`
  display: flex;
  justify-content: center;
  font-size: 13px;
  padding: 0 10px;
`;

const UserData = styled.div`
  justify-content: center;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const Menu = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  padding: 0 10px;
`;

const MenuItem = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 5px;
  font-size: 12px;
  color: ${({ theme }) => lighten(0.6, '#262841')};
`;

const MenuItemTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
`;

const MenuLeft = styled.div`
  display: flex;
`;

interface IProps {
  user: any;
}

export const UserPanelProfile: FC<IProps> = ({ user }) => (
  <Box>
    <Container>
      <UserData>
        <UserAvatar>
          <UserAvatarImg src={user.avatar} />
        </UserAvatar>
        <UserName>{user.name}</UserName>
      </UserData>
      <Menu>
        <MenuLeft>
          <MenuItem>
            <MenuItemTitle>Клипы</MenuItemTitle>
          </MenuItem>
        </MenuLeft>
      </Menu>
    </Container>
  </Box>
);
