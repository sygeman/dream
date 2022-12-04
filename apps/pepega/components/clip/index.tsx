import { FC, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useAccess } from '../../utils/use-access';
import { ClipScore } from '../clip-score';
import { ClipComments } from '../clip-comment';

const TwitchClipPlayer = dynamic(
  () => import('../clip-player').then((m) => m.TwitchClipPlayer),
  { ssr: false }
);

export interface ClipProps {
  clipId?: string;
  autoPlay?: boolean;
}

export const Clip: FC<ClipProps> = ({ clipId = '', autoPlay }) => {
  const [{ allow: isUser }] = useAccess();

  useEffect(() => {
    if (isUser) {
      // setClipHistory({ variables: { clipId } });
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
      {/* <div className="flex flex-1 relative bg-surface overflow-hidden">
        <ClipComments clipId={clipId} />
      </div> */}
    </div>
  );
};
