'use client';
import React from 'react';
import ReactPlayer from 'react-player';

const Player = ({ channelKey }) => {
  return (
    <ReactPlayer
      url={`https://www.twitch.tv/${channelKey}`}
      height="100%"
      width="100%"
      // playing
      muted
    />
  );
};

export default Player;
