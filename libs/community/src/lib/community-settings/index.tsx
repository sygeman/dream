import React from 'react';
import { useRouter } from 'next/router';
import { ChannelSettingsOverview } from './overview';
import { ChannelSettingsEmoji } from './emoji';

export const CommunitySettings = () => {
  const router = useRouter();
  const section = router.query['communitySettings'];

  switch (section) {
    case 'overview':
      return <ChannelSettingsOverview />;
    case 'emoji':
      return <ChannelSettingsEmoji />;
    default:
      return null;
  }
};
