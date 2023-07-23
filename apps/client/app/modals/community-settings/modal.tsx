'use client';
import { useMemo } from 'react';
import { SettingsLayout } from '../../../components/settings/layouts-settings';
import { CommunitySettingsOverview } from './overview';
import { CommunitySettingsEmoji } from './emoji';
import { usePathname, useSearchParams } from 'next/navigation';

export const CommunitySettingsModal = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const deleteCommunityLink = useMemo(() => {
    const newParams = new URLSearchParams(Array.from(searchParams.entries()));
    newParams.delete('communitySettings');
    newParams.set('deleteCommunity', '1');
    return `${pathname}?${newParams?.toString()}`;
  }, [searchParams]);

  return (
    <SettingsLayout
      id="communitySettings"
      menu={[
        {
          label: 'Community Settings',
          items: [
            // {
            //   key: 'overview',
            //   label: 'Overview',
            //   content: <CommunitySettingsOverview />,
            // },
            // {
            //   key: 'emoji',
            //   label: 'Emoji',
            //   content: <CommunitySettingsEmoji />,
            // },
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
