import gql from 'graphql-tag';
import Link from 'next/link';
import { darken, lighten } from 'polished';
import * as React from 'react';
import { Mutation, Query } from 'react-apollo';
import styled from 'styled-components';
import { Access } from '../../helpers/Access';
import { Dropdown } from '../../ui/Dropdown';
import { Emoji } from '../../ui/Emoji';
import { splitTextToEmojiArray } from '../../utils/emoji';

const GET_USER = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      role
      banned
      mainProfile {
        id
        name
        avatar
        serviceId
        serviceName
      }
    }
  }
`;

const SET_USER_ROLE_MOD = gql`
  mutation setUserRoleMod($id: ID!) {
    setUserRoleMod(id: $id)
  }
`;

const UNSET_USER_ROLE_MOD = gql`
  mutation unsetUserRoleMod($id: ID!) {
    unsetUserRoleMod(id: $id)
  }
`;

const SET_USER_BAN = gql`
  mutation setUserBan($id: ID!) {
    setUserBan(id: $id)
  }
`;

const UNSET_USER_BAN = gql`
  mutation unsetUserBan($id: ID!) {
    unsetUserBan(id: $id)
  }
`;

const REMOVE_MESSAGE = gql`
  mutation removeComment($id: ID!) {
    removeComment(id: $id)
  }
`;

const Message = styled.div`
  font-size: 12.5px;
  position: relative;
  overflow: hidden;

  :last-child {
    padding-bottom: 8px;
  }
`;

const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 26px;
  border-radius: 100%;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 20;
`;

const AvatarImg = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: ${props => props.theme.dark2Color};
`;

const AvatarNone = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: ${props => props.theme.accent2Color};
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 28px;
  padding-top: 10px;
`;

const Username = styled('div')<{ userColor?: string }>`
  font-weight: 500;
  color: ${props =>
    props.userColor
      ? props.userColor
      : lighten('0.15', props.theme.accent2Color)};
  flex: 1;
`;

const Date = styled.div`
  color: ${props => props.theme.accent2Color};
  font-size: 12px;
  text-align: right;
  padding: 0 16px;
`;

const Content = styled.div`
  position: relative;
`;

const Text = styled.div`
  color: ${props => props.theme.accent2Color};
  padding: 4px 10px 4px 50px;
  overflow: hidden;
  overflow-wrap: break-word;
`;

const ManageMenu = styled.div`
  display: none;
  position: absolute;
  right: 0;
  top: 0;
  height: 22px;
  padding: 0 10px;
  margin-right: 4px;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;

  ${Content}:hover & {
    display: flex;
  }
`;

const ManageItem = styled.div`
  padding: 0 3px;
  color: ${props => props.theme.accent2Color};

  i {
    font-size: 17px;
    color: ${props => props.theme.accent2Color};
  }

  :hover {
    color: #fff;

    i {
      color: #fff;
    }
  }
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
  text: string;
  compact: boolean;
  authorId: string;
}

export default class extends React.Component<IProps, {}> {
  public renderContent = () => {
    const { text } = this.props;
    return splitTextToEmojiArray(text).map((elm, index) => {
      if (elm.type === 'text') {
        return <React.Fragment key={index}>{elm.value}</React.Fragment>;
      }

      if (elm.type === 'emoji') {
        return <Emoji key={index} name={elm.name} />;
      }
    });
  };

  public renderUserMenu(user) {
    return (
      <UserMenu>
        <Link href={`user?id=${user.id}`}>
          <UserMenuItem>Профиль</UserMenuItem>
        </Link>

        <Access
          name="setUserBan"
          allow={currentUser => {
            if (user.banned) {
              return false;
            }

            if (currentUser.role !== 'admin' && currentUser.role !== 'mod') {
              return false;
            }

            if (
              user.role === 'admin' ||
              (user.role === 'mod' && currentUser.role !== 'admin')
            ) {
              return false;
            }

            return true;
          }}
        >
          <Mutation mutation={SET_USER_BAN}>
            {setUserBan => (
              <UserMenuItem
                onClick={() =>
                  setUserBan({
                    variables: {
                      id: user.id
                    }
                  })
                }
              >
                Забанить
              </UserMenuItem>
            )}
          </Mutation>
        </Access>

        <Access
          allow={currentUser => {
            if (!user.banned) {
              return false;
            }

            if (currentUser.role !== 'admin' && currentUser.role !== 'mod') {
              return false;
            }

            return currentUser.role === 'admin' && user.role === 'user';
          }}
        >
          <Mutation mutation={UNSET_USER_BAN}>
            {unsetUserBan => (
              <UserMenuItem
                onClick={() =>
                  unsetUserBan({
                    variables: {
                      id: user.id
                    }
                  })
                }
              >
                Разабанить
              </UserMenuItem>
            )}
          </Mutation>
        </Access>

        <Access
          allow={currentUser =>
            currentUser.role === 'admin' && user.role === 'user'
          }
        >
          <Mutation mutation={SET_USER_ROLE_MOD}>
            {setUserRoleMod => (
              <UserMenuItem
                onClick={() =>
                  setUserRoleMod({
                    variables: {
                      id: user.id
                    }
                  })
                }
              >
                Назначить модератором
              </UserMenuItem>
            )}
          </Mutation>
        </Access>

        <Access
          allow={currentUser =>
            currentUser.role === 'admin' && user.role === 'mod'
          }
        >
          <Mutation mutation={UNSET_USER_ROLE_MOD}>
            {unsetUserRoleMod => (
              <UserMenuItem
                onClick={() =>
                  unsetUserRoleMod({
                    variables: {
                      id: user.id
                    }
                  })
                }
              >
                Разжаловать модератора
              </UserMenuItem>
            )}
          </Mutation>
        </Access>
      </UserMenu>
    );
  }

  public renderMessage(user) {
    const { compact } = this.props;

    const usernameColors = {
      admin: 'rgb(194, 121, 121)',
      mod: 'rgb(124, 194, 121)'
    };

    const userColor = usernameColors[user.role]
      ? usernameColors[user.role]
      : undefined;

    return (
      <Message>
        {!compact && (
          <Header>
            <Dropdown overlay={this.renderUserMenu(user)}>
              <Avatar>
                {user.mainProfile.avatar ? (
                  <AvatarImg src={user.mainProfile.avatar} />
                ) : (
                  <AvatarNone />
                )}
              </Avatar>
            </Dropdown>
            <Username userColor={userColor}>{user.mainProfile.name}</Username>
            <Date />
          </Header>
        )}
        <Content>
          <Text>{this.renderContent()}</Text>
          {/* <Access name="manageMessage"> */}
          <ManageMenu>
            <Access
              allow={currentUser => {
                return (
                  currentUser.role === 'mod' || currentUser.role === 'admin'
                );
              }}
            >
              <Mutation mutation={REMOVE_MESSAGE}>
                {removeMessage => (
                  <ManageItem
                    onClick={() =>
                      removeMessage({
                        variables: {
                          id: this.props.id
                        }
                      })
                    }
                  >
                    <i className="zmdi zmdi-close" />
                  </ManageItem>
                )}
              </Mutation>
            </Access>
          </ManageMenu>
          {/* </Access> */}
        </Content>
      </Message>
    );
  }

  public render() {
    const { authorId } = this.props;

    return (
      <Query query={GET_USER} variables={{ id: authorId }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div />;
          }

          if (error || !data.user || !data.user.mainProfile) {
            return null;
          }

          return this.renderMessage(data.user);
        }}
      </Query>
    );
  }
}
