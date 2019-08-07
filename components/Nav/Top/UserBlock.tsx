import Link from 'next/link';
import { darken, lighten } from 'polished';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Avatar, Icon } from '../../../ui';
import config from '../../../config';
import { Access } from '../../../providers/Access';
import { Dropdown } from '../../../ui';

const GET_USER = gql`
  query getUser($id: ID) {
    user(id: $id) {
      id
      name
      avatar
    }
  }
`;

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

const UserNameBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: ${({ theme }) => lighten(0.4, theme.main1Color)};

  @media (max-width: 700px) {
    display: none;
  }
`;

const UserDataBox = styled.div`
  padding: 0 5px;
  display: flex;
  cursor: pointer;
  align-items: center;
  height: 100%;
`;

const AvatarBox = styled.div`
  padding-left: 14px;
`;

const UserCaratBox = styled.div`
  height: 100%;
  padding: 0 6px;
  display: flex;
  align-items: center;
  font-size: 17px;
`;

export const TopNavMenuUserBlock = () => {
  const { loading, error, data } = useQuery(GET_USER);

  if (loading || error) {
    return null;
  }

  const user = data.user;

  return (
    <Box>
      <Dropdown
        overlay={
          <UserMenu>
            <Link href={`/user?id=${user.id}`} passHref>
              <UserMenuItem>Профиль</UserMenuItem>
            </Link>
            <Access allow={currentUser => currentUser.role === 'admin'}>
              <Link href="/manage" passHref>
                <UserMenuItem>Панель управления</UserMenuItem>
              </Link>
            </Access>
            <Link href={`${config.apiUrl}logout`} passHref>
              <UserMenuItem>Выход</UserMenuItem>
            </Link>
          </UserMenu>
        }
      >
        <UserDataBox>
          <UserNameBox>{user.name}</UserNameBox>
          <AvatarBox>
            <Avatar dot avatar={user.avatar} />
          </AvatarBox>
          <UserCaratBox>
            <Icon type="caret-down" />
          </UserCaratBox>
        </UserDataBox>
      </Dropdown>
    </Box>
  );
};
