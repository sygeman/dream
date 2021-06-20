import React from 'react';
import { useRouter } from 'next/router';
import { ChannelSpotifyModeOverlay } from '@dream/mode/spotify/ui';
import { useChannelQuery, ChannelMode } from '@dream/types';

export const CommunityChannelOverlay = () => {
  const router = useRouter();
  const name =
    typeof router.query?.channel === 'string' && router.query?.channel;

  const communityQuery = useChannelQuery({
    variables: { name },
    skip: !name,
  });

  const channel = communityQuery?.data?.channel;

  switch (channel?.mode) {
    case ChannelMode.Spotify:
      return <ChannelSpotifyModeOverlay />;
    default:
      return null;
  }
};
