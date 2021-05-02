import React from 'react';
import { useRouter } from 'next/router';
import { ChannelSettingsOverview } from './overview';
import { ChannelSettingsMode } from './mode';

export const ChannelSettings = () => {
  const router = useRouter();
  const section = router.query['channelSettings'];

  switch (section) {
    case 'overview':
      return <ChannelSettingsOverview />;
    case 'mode':
      return <ChannelSettingsMode />;
    default:
      return null;
  }
};
