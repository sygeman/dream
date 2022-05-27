import { Clip } from '@dream/pepega/clip/ui';

export const ClipModal = ({ clipId }: { clipId: string }) => (
  <div className="w-[1000px]">
    <Clip clipId={clipId} autoPlay />
  </div>
);
