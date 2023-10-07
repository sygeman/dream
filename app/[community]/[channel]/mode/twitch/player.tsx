'use client';
import ReactPlayer from 'react-player';

type Properties = {
  channelKey: string;
};

const Player = ({ channelKey }: Properties) => (
  <ReactPlayer
    url={`https://www.twitch.tv/${channelKey}`}
    height="100%"
    width="100%"
    muted
  />
);

export default Player;
