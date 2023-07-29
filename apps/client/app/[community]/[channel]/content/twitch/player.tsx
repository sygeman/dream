'use client';
import ReactPlayer from 'react-player';

type Props = {
  channelKey: string;
};

const Player = ({ channelKey }: Props) => (
  <ReactPlayer
    url={`https://www.twitch.tv/${channelKey}`}
    height="100%"
    width="100%"
    muted
  />
);

export default Player;
