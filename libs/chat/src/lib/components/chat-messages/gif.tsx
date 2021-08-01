import React from 'react';
import ReactPlayer from 'react-player';

const getContainerHeight = ({
  width,
  height,
  parentWidth = 256,
}: {
  width: number;
  height: number;
  parentWidth?: number;
}): number => {
  return (parentWidth * height) / width;
};

export const GifContainer = ({
  isIntersecting,
  tenorGif: { width, height, video },
}) => {
  const containerHeight = getContainerHeight({ width, height });

  return (
    <div
      style={{ height: containerHeight }}
      className="w-full bg-background rounded overflow-hidden"
    >
      {isIntersecting && (
        <ReactPlayer
          url={[{ src: video, type: 'video/mp4' }]}
          width="100%"
          height="100%"
          playing
          loop
        />
      )}
    </div>
  );
};
