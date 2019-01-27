import Link from 'next/link';
import { darken } from 'polished';
import * as React from 'react';
import styled from 'styled-components';
import config from '../../../config';
import { Access } from '../../../helpers/Access';
import { Dropdown } from '../../../ui/Dropdown';

const Box = styled.div`
  height: 100%;
  align-items: center;
  display: flex;
`;

const UserMenu = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.main1Color};
  border-radius: 3px;
  overflow: hidden;
  margin: 5px;
  width: 150px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const UserMenuItem = styled.a`
  font-size: 13px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  :hover {
    background: ${({ theme }) => darken(0.1, theme.main1Color)};
  }
`;

interface IProps {
  user: any;
}

export default class PostMenu extends React.Component<IProps> {
  public renderMenu = () => {
    const { user } = this.props;

    return (
      <UserMenu>
        <Link href={`/user?id=${user.id}`} passHref>
          <UserMenuItem>Профиль</UserMenuItem>
        </Link>
        <Access allow={currentUser => currentUser.role === 'admin'}>
          <Link href="/manage" passHref>
            <UserMenuItem>Панель управления</UserMenuItem>
          </Link>
        </Access>
        <Link href="/settings" passHref>
          <UserMenuItem>Настройки</UserMenuItem>
        </Link>
        <Link href={`${config.apiUrl}logout`} passHref>
          <UserMenuItem>Выход</UserMenuItem>
        </Link>
      </UserMenu>
    );
  };

  public render() {
    const { children } = this.props;

    return (
      <Box>
        <Dropdown overlay={this.renderMenu()}>{children}</Dropdown>
      </Box>
    );
  }
}
