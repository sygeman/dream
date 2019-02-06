import nanoid from 'nanoid';
import { FC, useEffect } from 'react';
import useInterval from '../../hooks/useInterval';
import { randomInt } from '../../utils/random';
import { getSDK } from './getSDK';

interface IProps {
  autoplay: boolean;
  muted: boolean;
  channel: string;
}

export const TwitchPlayer: FC<IProps> = ({ autoplay, muted, channel }) => {
  const playerID = nanoid();
  let player;

  useInterval(() => {
    if (player) {
      player.setChannel();
      player.setChannel(channel);
      player.setQuality('160p30');
    }
  }, randomInt(15e3, 25e3));

  useEffect(() => {
    getSDK().then(Twitch => {
      player = new Twitch.Player(playerID, {
        channel,
        height: '100%',
        width: '100%',
        autoplay,
        muted,
        controls: false
      });

      player.setQuality('160p30');
    });
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%'
      }}
      id={playerID}
    />
  );
};
