import React, { useEffect } from 'react';
import { useSpotifyNowQuery } from '@dream/types';
import { TrackInfo } from './components/track-info';

export const SpotifyNow = () => {
  const spotifyNowQuery = useSpotifyNowQuery({ variables: { token: 'test' } });
  const current = spotifyNowQuery?.data?.spotifyNow;

  useEffect(() => {
    const t = setInterval(() => spotifyNowQuery.refetch(), 3000);
    return () => clearInterval(t);
  });

  let progress = 0;

  if (current) {
    progress = current?.progress;
  }

  const name = current?.name;
  const artist = current?.artist;
  const imageUrl = current?.imageUrl;

  return (
    <TrackInfo
      imageUrl={imageUrl}
      artist={artist}
      name={name}
      progress={progress}
    />
  );
};
