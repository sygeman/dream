import { FC, useEffect, useState } from 'react';

import useInterval from '../../hooks/useInterval';
import { randomInt } from '../../utils/random';
import { getSDK } from './getSDK';

interface IProps {
  autoplay: boolean;
  muted: boolean;
  channel: string;
}

export const TwitchPlayerInner: FC<IProps> = ({ autoplay, muted, channel }) => {
  const playerID = `twstream-${channel}`;
  let player;

  useEffect(() => {
    getSDK().then(Twitch => {
      player = new Twitch.Player(playerID, {
        channel,
        height: '100%',
        width: '100%',
        autoplay: true,
        muted,
        controls: false
      });

      player.addEventListener(Twitch.Player.PLAYING, () => {
        const qualities = player.getQualities();

        if (qualities[qualities.length - 1].group !== '160p30') {
          player.pause();
        } else {
          player.setQuality('160p30');
        }
      });
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

export const TwitchPlayer: FC<IProps> = props => {
  const [visible, setVisible] = useState(true);
  const delay = randomInt(15e3, 25e3);

  useInterval(() => {
    setVisible(false);
    setVisible(true);
  }, delay);

  if (!visible) {
    return null;
  }

  return <TwitchPlayerInner {...props} />;
};
