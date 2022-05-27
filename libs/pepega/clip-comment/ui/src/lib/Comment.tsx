import gql from 'graphql-tag';
import Link from 'next/link';
import { darken, lighten } from 'polished';
import React, { FC } from 'react';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { useAccess } from '@dream/pepega/utils-old';
import { Dropdown, Emoji } from '@dream/pepega/components-old';
import { splitTextToEmojiArray } from '@dream/pepega/utils-old';

const REMOVE_CLIP_COMMENT = gql`
  mutation removeClipComment($id: ID!) {
    removeClipComment(id: $id)
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
  background: ${(props) => '#262841'};
`;

const AvatarNone = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: ${(props) => '#968A9D'};
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 28px;
  padding-top: 10px;
`;

const Username = styled('div')<{ userColor?: string }>`
  font-weight: 500;
  color: ${(props) =>
    props.userColor ? props.userColor : lighten('0.15', '#968A9D')};
  flex: 1;
`;

const Date = styled.div`
  color: ${(props) => '#968A9D'};
  font-size: 12px;
  text-align: right;
  padding: 0 16px;
`;

const Content = styled.div`
  position: relative;
`;

const Text = styled.div`
  color: ${(props) => '#968A9D'};
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
  color: ${(props) => '#968A9D'};

  i {
    font-size: 17px;
    color: ${(props) => '#968A9D'};
  }

  :hover {
    color: #fff;

    i {
      color: #fff;
    }
  }
`;

const UserMenu = styled.div`
  background: ${({ theme }) => '#1D1E31'};
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
    background: ${({ theme }) => darken(0.05, '#1D1E31')};
  }
`;

const renderMessageText = (text: string) => {
  return splitTextToEmojiArray(text).map((elm, index) => {
    if (elm.type === 'text') {
      return <React.Fragment key={index}>{elm.value}</React.Fragment>;
    }

    if (elm.type === 'emoji' && elm.name) {
      return <Emoji key={index} name={elm.name} />;
    }
  });
};

interface IProps {
  id: string;
  content: string;
  compact: boolean;
  author: any;
  authorId: string;
}

export const ClipComment: FC<IProps> = ({ id, content, compact, author }) => {
  const [removeClipComment] = useMutation(REMOVE_CLIP_COMMENT);

  const usernameColors = {
    admin: 'rgb(194, 121, 121)',
    mod: 'rgb(124, 194, 121)',
  };

  const userColor = usernameColors[author.role]
    ? usernameColors[author.role]
    : undefined;

  const [{ allow: isAllowRemoveClipComment }] = useAccess((currentUser) => {
    return currentUser.role === 'mod' || currentUser.role === 'admin';
  });

  return (
    <Message>
      {!compact && (
        <Header>
          <Dropdown
            overlay={
              <UserMenu>
                <Link href={`user?id=${author.id}`}>
                  <UserMenuItem>Профиль</UserMenuItem>
                </Link>
              </UserMenu>
            }
          >
            <Avatar>
              {author.avatar ? (
                <AvatarImg src={author.avatar} />
              ) : (
                <AvatarNone />
              )}
            </Avatar>
          </Dropdown>
          <Username userColor={userColor}>{author.name}</Username>
          <Date />
        </Header>
      )}
      <Content>
        <Text>{renderMessageText(content)}</Text>
        <ManageMenu>
          {isAllowRemoveClipComment && (
            <ManageItem
              onClick={() => removeClipComment({ variables: { id } })}
            >
              <i className="zmdi zmdi-close" />
            </ManageItem>
          )}
        </ManageMenu>
      </Content>
    </Message>
  );
};