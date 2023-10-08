import Image from 'next/image';

import { secondsToDurationFormat } from '@/helpers/seconds-to-duration-format';

import { useProgress } from './use-progress';

type Properties = {
  start: number;
  duration: number;
  imageUrl: string;
  name: string;
};

export const ChannelModeWaitlistProgress = ({
  start,
  duration,
  imageUrl,
  name,
}: Properties) => {
  const { progress } = useProgress(start);

  return (
    <div className="flex relative w-full h-12">
      <div className="flex absolute left-0 bottom-0 w-full">
        <div className="flex items-center justify-center h-12 w-12">
          {imageUrl && <Image width={48} height={48} src={imageUrl} alt="" />}
        </div>
        <div className="flex flex-1 relative">
          <div
            className="absolute top-0 left-0 h-full opacity-50 bg-background"
            style={{ width: `${progress * 100}%` }}
          />
          <div className="absolute top-0 left-0 h-full w-full flex items-center px-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground font-medium">
                {name}
              </span>
              <span className="text-lg text-white">
                <div className="text-xs">
                  <span>{secondsToDurationFormat(progress)}</span>
                  <span className="text-muted-foreground px-1">/</span>
                  <span className="text-muted-foreground">
                    {secondsToDurationFormat(duration / 1000)}
                  </span>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
