import React from 'react';
import { useRouter } from 'next/router';
// import { UserSettingsOverview } from './overview';
import { UserSettingsLanguage } from './language';

export const UserSettings = () => {
  const router = useRouter();
  const section = router.query['userSettings'];

  switch (section) {
    // case 'overview':
    //   return <UserSettingsOverview />;
    case 'language':
      return <UserSettingsLanguage />;
    default:
      return null;
  }
};
