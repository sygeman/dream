import React from 'react';
import { useRouter } from 'next/router';
import { CommunitySettingsOverview } from './overview';
import { CommunitySettingsEmoji } from './emoji';

export const CommunitySettings: React.FC = () => {
  const router = useRouter();
  const section = router.query['communitySettings'];

  switch (section) {
    case 'overview':
      return <CommunitySettingsOverview />;
    case 'emoji':
      return <CommunitySettingsEmoji />;
    default:
      return null;
  }
};
