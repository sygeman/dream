import { useAccess } from '@dream/pepega/auth/ui';
import { XIcon } from '@heroicons/react/solid';
import { Avatar } from '@dream/pepega/components/avatar';
import { ClipCommentUser } from '@dream/pepega/types';
import { useRemoveClipCommentMutation } from './clip-comment.api';

export const ClipComment = ({
  id,
  content,
  user,
}: {
  id: string;
  content: string;
  user: ClipCommentUser;
  userId: string;
}) => {
  const [removeClipCommentMutation] = useRemoveClipCommentMutation();
  const removeClipComment = () =>
    removeClipCommentMutation({
      variables: { id },
    });

  const [{ allow: isAllowRemoveClipComment }] = useAccess((currentUser) => {
    return currentUser.role === 'Mod' || currentUser.role === 'Admin';
  });

  return (
    <div className="relative overflow-hidden text-sm last:pb-2">
      <div className="flex w-full h-7 pt-2">
        <div className="px-2 z-10">
          <Avatar avatar={user.avatar} />
        </div>
        <div className="text-white/75 flex flex-1 font-medium">{user.name}</div>
      </div>
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
    </div>
  );
};
