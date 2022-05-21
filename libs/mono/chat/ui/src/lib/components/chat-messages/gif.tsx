import React from 'react';
import ReactPlayer from 'react-player';

interface GifContainerProps {
  isIntersecting?: boolean;
  tenorGif: any;
}

export const GifContainer: React.FC<GifContainerProps> = React.memo(
  ({ isIntersecting, tenorGif: { containerHeight, video } }) => {
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
