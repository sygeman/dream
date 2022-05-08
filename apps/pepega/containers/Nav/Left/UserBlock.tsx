import Link from 'next/link';
import { darken, lighten } from 'polished';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Avatar, Dropdown } from '@pepega/components';
import { useAccess } from '@pepega/utils/useAccess';
import { MoreVert as MoreVertIcon } from 'styled-icons/material/MoreVert';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

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
  height: 42px;
  align-items: center;
  display: flex;
  background: ${({ theme }) => lighten(0.1, theme.colors.surface)};
`;

const UserMenu = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 3px;
  overflow: hidden;
  margin-left: -174px;
  margin-bottom: 4px;
  width: 220px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const UserMenuItem = styled.div`
  font-size: 13px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  :hover {
    background: ${({ theme }) => darken(0.1, theme.colors.primary)};
  }
`;

const AvatarBox = styled.div`
  padding: 0 14px;
`;

const UserNameBox = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  font-size: 13px;
  padding: 0 5px;
  color: ${({ theme }) => lighten(0.6, theme.colors.surface)};
`;

const UserCaratBox = styled.div`
  height: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  font-size: 17px;
  cursor: pointer;
`;

export const LeftNavMenuUserBlock = () => {
  const [{ allow: isAdmin }] = useAccess(
    currentUser => currentUser.role === 'admin'
  );
  const { loading, error, data } = useQuery(GET_USER, { ssr: false });

  if (loading || error) {
    return null;
  }

  const user = data.user;

  return (
    <Box>
      <AvatarBox>
        <Avatar dot avatar={user.avatar} />
      </AvatarBox>
      <UserNameBox>{user.name}</UserNameBox>
      <Dropdown
        overlay={
          <UserMenu>
            <Link href={`/user?id=${user.id}`} passHref>
              <UserMenuItem>Профиль</UserMenuItem>
            </Link>
            {isAdmin && (
              <Link href="/manage" passHref>
                <UserMenuItem>Панель управления</UserMenuItem>
              </Link>
            )}
            <a href={`${publicRuntimeConfig.apiUrl}logout`}>
              <UserMenuItem>Выход</UserMenuItem>
            </a>
          </UserMenu>
        }
      >
        <UserCaratBox>
          <MoreVertIcon size="16px" />
        </UserCaratBox>
      </Dropdown>
    </Box>
  );
};
