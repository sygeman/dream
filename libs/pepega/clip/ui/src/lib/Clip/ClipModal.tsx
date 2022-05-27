import { FC } from 'react';
import { Clip } from '@dream/pepega/clip/ui';

interface ClipModalProps {
  clipId: string;
}

export const ClipModal: FC<ClipModalProps> = ({ clipId }) => {
  return (
    <div className="w-[1000px]">
      <Clip clipId={clipId} autoPlay />
    </div>
  );
};
