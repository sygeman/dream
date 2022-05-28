import { FC } from 'react';
import styled from 'styled-components';
import { useAccess } from '@dream/pepega/auth/ui';
import { XIcon } from '@heroicons/react/solid';
import { useRemoveClipCommentMutation } from './clip-comment.api';

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

interface IProps {
  id: string;
  content: string;
  compact: boolean;
  user: any;
  userId: string;
}

export const ClipComment: FC<IProps> = ({ id, content, compact, user }) => {
  const [removeClipCommentMutation] = useRemoveClipCommentMutation();
  const removeClipComment = () =>
    removeClipCommentMutation({
      variables: { id },
    });

  const [{ allow: isAllowRemoveClipComment }] = useAccess((currentUser) => {
    return currentUser.role === 'Mod' || currentUser.role === 'Admin';
  });

  return (
    <Message>
      <Header>
        <Avatar>
          {user.avatar ? <AvatarImg src={user.avatar} /> : <AvatarNone />}
        </Avatar>
        <div className="text-white/75 flex flex-1 font-medium">{user.name}</div>
      </Header>
      <div className="relative group">
        <div className="text-white/50 py-1 pr-3 pl-12 overflow-hidden break-words group-hover:bg-background/50">
          {content}
        </div>
        <div className="absolute top-1 right-2 hidden group-hover:flex">
          {isAllowRemoveClipComment && (
            <button
              className="p-1 bg-background rounded"
              onClick={removeClipComment}
            >
              <XIcon className="h-3 text-white/50" />
            </button>
          )}
        </div>
      </div>
    </Message>
  );
};
