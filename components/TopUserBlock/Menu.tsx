import Router from 'next/router';
import { darken } from 'polished';
import * as React from 'react';
import { logout } from '../../lib/auth';
import styled from '../../theme';
import { Dropdown } from '../../ui/Dropdown';
import { changeURLParams } from '../../utils/url';
import Access from '../Access';

const Box = styled.div`
  height: 100%;
  align-items: center;
  display: flex;
`;

const UserMenu = styled.div`
  background: ${({ theme }) => theme.main1Color};
  border-radius: 3px;
  overflow: hidden;
  margin: 5px;
  width: 150px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const UserMenuItem = styled.div`
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
        <UserMenuItem onClick={() => Router.push(`/user?id=${user.id}`)}>
          Профиль
        </UserMenuItem>
        <UserMenuItem onClick={() => Router.push(`/likes`)}>Лайки</UserMenuItem>
        <Access allow={currentUser => currentUser.role === 'admin'}>
          <UserMenuItem onClick={() => Router.push('/manage')}>
            Панель управления
          </UserMenuItem>
        </Access>
        <UserMenuItem onClick={() => changeURLParams({ set: { profile: 1 } })}>
          Настройки
        </UserMenuItem>
        <UserMenuItem onClick={() => logout()}>Выход</UserMenuItem>
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
