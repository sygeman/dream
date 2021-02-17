import React from 'react';
import ReactPlayer from 'react-player';

export const CommunityContent = () => {
  return (
    <div className="h-screen w-full flex flex-1">
      <ReactPlayer
        url="https://www.youtube.com/watch?v=ARmqJ0k0rCQ"
        height="100%"
        width="100%"
        playing
        loop
        muted
        controls
        config={{
          youtube: {
            playerVars: {
              rel: 0,
            },
          },
        }}
      />
    </div>
  );
};
