import React, { useEffect, useState } from 'react';
import { Flex } from '@dream/ui/base/Flex';
import { WithApollo } from '@dream/utils/apollo/WithApollo';
import { CurrentPlaying as CurrentPlayingContainer } from './';
import { TrackInfo as TrackInfoUI } from './TrackInfo';

export default {
  title: 'Containers/RavePro',
};

export const CurrentPlaying = () => {
  return (
    <WithApollo>
      <CurrentPlayingContainer />
    </WithApollo>
  );
};

export const TrackInfo = () => {
  const tracks = [
    {
      name: 'Ascension',
      artist: 'Fourward',
      imageUrl:
        'https://i.scdn.co/image/ab67616d000048510a2512b55c0ce066667cf4a3',
      progress: 0.3,
    },
    {
      name: 'Way of the Warrior - June Miller Remix',
      artist: 'James Marvel, MC Mota, June Miller',
      imageUrl:
        'https://i.scdn.co/image/ab67616d0000485173b2d878958069bdd9f42135',
      progress: 0.9,
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent(current === 0 ? 1 : 0);
    }, 3000);
    return () => clearInterval(t);
  });

  const { imageUrl, artist, name, progress } = tracks[current];

  return (
    <Flex height="256px" width="100%">
      <TrackInfoUI
        imageUrl={imageUrl}
        artist={artist}
        name={name}
        progress={progress}
      />
    </Flex>
  );
};
