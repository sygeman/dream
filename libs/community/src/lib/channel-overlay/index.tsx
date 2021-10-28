import React from 'react';
import { ChannelSpotifyModeOverlay } from '@dream/mode/spotify/ui';
import { ChannelYoutubeModeOverlay } from '@dream/mode/youtube/ui';
import { ChannelMode } from '@dream/types';
import { useCommunityChannel } from '../use-community-channel';

export const CommunityChannelOverlay = () => {
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
