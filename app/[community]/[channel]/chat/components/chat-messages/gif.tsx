import { memo } from 'react';
import ReactPlayer from 'react-player';

type Properties = {
  isIntersecting?: boolean;
  tenorGif: any;
};

export const GifContainer = memo(
  ({ isIntersecting, tenorGif: { containerHeight, video } }: Properties) => {
    return (
      <div
        style={{ height: containerHeight }}
        className="w-full bg-background rounded overflow-hidden"
      >
        {/* {isIntersecting && ( */}
        <ReactPlayer
          url={[{ src: video, type: 'video/mp4' }]}
          width="100%"
          height="100%"
          playing={isIntersecting}
          loop
        />
        {/* )} */}
      </div>
    );
  }
);

GifContainer.displayName = 'GifContainer';
