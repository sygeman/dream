import React from 'react';
import { useRouter } from 'next/router';
import { ChannelSettingsOverview } from './overview';

export const CommunitySettings = () => {
  const router = useRouter();
  const section = router.query['communitySettings'];

  switch (section) {
    case 'overview':
      return <ChannelSettingsOverview />;
    default:
      return null;
  }
};
