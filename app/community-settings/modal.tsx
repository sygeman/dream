'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { SettingsLayout } from '@/components/settings/layouts-settings';

import { CommunitySettingsOverview } from './overview';

export const CommunitySettingsModal = () => {
  const searchParameters = useSearchParams();
  const pathname = usePathname();

  const deleteCommunityLink = useMemo(() => {
    const newParameters = new URLSearchParams([...searchParameters.entries()]);
    newParameters.delete('communitySettings');
    newParameters.set('deleteCommunity', '1');
    return `${pathname}?${newParameters?.toString()}`;
  }, [pathname, searchParameters]);

  return (
    <SettingsLayout
      id="communitySettings"
      menu={[
        {
          label: 'Community Settings',
          items: [
            {
              key: 'overview',
              label: 'Overview',
              content: <CommunitySettingsOverview />,
            },
          ],
        },
        {
          items: [
            {
              key: 'delete-community',
              label: 'Delete Community',
              link: deleteCommunityLink,
            },
          ],
        },
      ]}
    />
  );
};
