import React, { useEffect } from 'react';
import useAxios from 'axios-hooks';
import '@pepega/utils/axios';
import { gql, useQuery } from '@apollo/client';
import { TrackInfo } from './TrackInfo';

const CurrentPlayingInner = () => {
  const [{ data: current }, refetch] = useAxios(
    'https://api.spotify.com/v1/me/player'
  );

  useEffect(() => {
    const t = setInterval(() => refetch(), 3000);
    return () => clearInterval(t);
  });

  let progress = 0;

  if (current) {
    progress = current?.progress_ms / current?.item?.duration_ms;
  }

  const name = current?.item?.name;
  const artist = (current?.item?.artists || [])
    .map((artist) => artist?.name)
    .join(', ');
  const images = current?.item?.album?.images || [];

  return (
    <TrackInfo
      imageUrl={images[images.length - 1]?.url}
      artist={artist}
      name={name}
      progress={progress}
    />
  );
};

export const CurrentPlaying = () => {
  const meQuery = useQuery(gql`
    query me {
      me {
        id
        profile {
          id
          name
          avatar
        }
      }
    }
  `);

  const profile = meQuery?.data?.me?.profile;

  if (profile) {
    return <CurrentPlayingInner />;
  } else {
    return null;
  }
};
