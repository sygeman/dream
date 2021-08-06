import React from 'react';
import { useRouter } from 'next/router';
import { ChannelSettingsOverview } from './overview';
import { ChannelSettingsMode } from './mode';
import { ChannelSettingsChat } from './chat';

export const ChannelSettings = () => {
  const router = useRouter();
  const section = router.query['channelSettings'];

  switch (section) {
    case 'overview':
      return <ChannelSettingsOverview />;
    case 'mode':
      return <ChannelSettingsMode />;
    case 'chat':
      return <ChannelSettingsChat />;
    default:
      return null;
  }
};
