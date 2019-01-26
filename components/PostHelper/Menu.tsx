import gql from 'graphql-tag';
import { darken } from 'polished';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import { Access } from '../../helpers/Access';
import { ButtonFlat } from '../../ui/Button';
import { Dropdown } from '../../ui/Dropdown';
import { Icon } from '../../ui/Icon';

const REMOVE_POST = gql`
  mutation($id: ID!) {
    removePost(id: $id)
  }
`;

const PIN_POST = gql`
  mutation($id: ID!) {
    pinPost(id: $id)
  }
`;

const UNPIN_POST = gql`
  mutation($id: ID!) {
    unpinPost(id: $id)
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
  pinned: boolean;
  authorId: string;
}

export default class PostMenu extends React.Component<IProps> {
  public renderMenu = (id: string, pinned: boolean, authorId: string) => {
    return (
      <UserMenu>
        <Access
          allow={currentUser =>
            currentUser.role === 'admin' ||
            currentUser.role === 'mod' ||
            (currentUser.id && authorId === currentUser.id)
          }
        >
          <Mutation mutation={REMOVE_POST}>
            {removePost => (
              <UserMenuItem onClick={() => removePost({ variables: { id } })}>
                Удалить
              </UserMenuItem>
            )}
          </Mutation>
        </Access>
        <Access allow={currentUser => currentUser.role === 'admin'}>
          {pinned ? (
            <Mutation mutation={UNPIN_POST}>
              {unpinPost => (
                <UserMenuItem onClick={() => unpinPost({ variables: { id } })}>
                  Открепить
                </UserMenuItem>
              )}
            </Mutation>
          ) : (
            <Mutation mutation={PIN_POST}>
              {pinPost => (
                <UserMenuItem onClick={() => pinPost({ variables: { id } })}>
                  Закрепить
                </UserMenuItem>
              )}
            </Mutation>
          )}
        </Access>
      </UserMenu>
    );
  };

  public render() {
    const { id, pinned, authorId } = this.props;

    return (
      <Access
        allow={currentUser =>
          currentUser.role === 'admin' ||
          currentUser.role === 'mod' ||
          (currentUser.id && authorId === currentUser.id)
        }
      >
        <Box>
          <Dropdown overlay={this.renderMenu(id, pinned, authorId)}>
            <ButtonFlat>
              <Icon type="more-vert" />
            </ButtonFlat>
          </Dropdown>
        </Box>
      </Access>
    );
  }
}
