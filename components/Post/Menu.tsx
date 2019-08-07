import gql from 'graphql-tag';
import { darken } from 'polished';
import { FC } from 'react';
import { useMutation } from 'react-apollo';
import styled from 'styled-components';
import { useAccess } from '../../hooks/useAccess';
import { ButtonFlat, Dropdown, Icon } from '../../ui';

const REMOVE_POST = gql`
  mutation removePost($id: ID!) {
    removePost(id: $id)
  }
`;

const Box = styled.div`
  height: 100%;
  align-items: center;
  display: flex;
  width: 40px;
  justify-content: center;
`;

const UserMenu = styled.div`
  background: ${({ theme }) => theme.dark1Color};
  border-radius: 3px;
  overflow: hidden;
  margin: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const UserMenuItem = styled.div`
  font-size: 13px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  :hover {
    background: ${({ theme }) => darken(0.05, theme.dark1Color)};
  }
`;

interface IProps {
  id: string;
  authorId: string;
}

export const PostMenu: FC<IProps> = ({ id, authorId }) => {
  const [removePost] = useMutation(REMOVE_POST);

  const isStaffOrAuthor = useAccess(
    currentUser =>
      currentUser.role === 'admin' ||
      currentUser.role === 'mod' ||
      (currentUser.id && authorId === currentUser.id)
  );

  if (!isStaffOrAuthor) {
    return null;
  }

  return (
    <Box>
      <Dropdown
        overlay={
          <UserMenu>
            <UserMenuItem onClick={() => removePost({ variables: { id } })}>
              Удалить
            </UserMenuItem>
          </UserMenu>
        }
      >
        <ButtonFlat>
          <Icon type="more-vert" />
        </ButtonFlat>
      </Dropdown>
    </Box>
  );
};
