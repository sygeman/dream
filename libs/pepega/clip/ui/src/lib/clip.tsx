import { FC, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useAccess } from '@dream/pepega/auth/ui';
import { ClipScore } from '@dream/pepega/clip-score/ui';
import { ClipComments } from '@dream/pepega/clip-comment/ui';
import { useSetClipHistoryMutation } from '@dream/pepega/clip-history/ui';

const TwitchClipPlayer = dynamic(
  () =>
    import('@dream/pepega/components/clip-player').then(
      (m) => m.TwitchClipPlayer
    ),
  { ssr: false }
);

export interface ClipProps {
  clipId?: string;
  autoPlay?: boolean;
}

export const Clip: FC<ClipProps> = ({ clipId = '', autoPlay }) => {
  const [setClipHistory] = useSetClipHistoryMutation();
  const [{ allow: isUser }] = useAccess();

  useEffect(() => {
    if (isUser) {
      setClipHistory({ variables: { clipId } });
    }
  }, [isUser]);

  if (!clipId) {
    return null;
  }

  return (
    <div className="flex flex-col flex-1 bg-surface rounded overflow-hidden">
      <div className="bg-background">
        <TwitchClipPlayer sourceId={clipId} autoPlay={autoPlay} />
      </div>
      <div className="flex py-3">
        <ClipScore clipId={clipId} />
        {/* <ClipShare clipId={clipId} /> */}
      </div>
      <div className="flex flex-1 relative bg-surface overflow-hidden">
        <ClipComments clipId={clipId} />
      </div>
    </div>
  );
};
