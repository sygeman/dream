import React from 'react';
import { ChannelSpotifyModeOverlay } from '@dream/mono-mode-spotify-ui';
import { ChannelYoutubeModeOverlay } from '@dream/mono-mode-youtube-ui';
import { ChannelMode } from '@dream/mono-types';
import { useCommunityChannel } from '@dream/mono-use-community-channel';

export const ChannelOverlay = () => {
  const { channel } = useCommunityChannel();

  switch (channel?.mode) {
    case ChannelMode.Spotify:
      return <ChannelSpotifyModeOverlay />;
    case ChannelMode.Youtube:
      return <ChannelYoutubeModeOverlay />;
    default:
      return null;
  }
};
