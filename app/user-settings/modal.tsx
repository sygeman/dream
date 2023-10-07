'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { SettingsLayout } from '@/components/settings/layouts-settings';
import { useIntl } from '@/libs/intl';

import { UserSettingsLanguage } from './language';

export const UserSettingsModal = () => {
  const searchParameters = useSearchParams();
  const pathname = usePathname();
  const { formatMessage } = useIntl();

  const logoutLink = useMemo(() => {
    const newParameters = new URLSearchParams([...searchParameters.entries()]);
    newParameters.delete('userSettings');
    newParameters.set('logout', '1');
    return `${pathname}?${newParameters?.toString()}`;
  }, [pathname, searchParameters]);

  return (
    <SettingsLayout
      id="userSettings"
      menu={[
        {
          label: formatMessage({ id: 'userSettingsMenuLabel' }),
          items: [
            {
              key: 'language',
              label: formatMessage({ id: 'userSettingsLanguageMenuItemLabel' }),
              content: <UserSettingsLanguage />,
            },
          ],
        },
        {
          items: [
            {
              key: 'logout',
              label: formatMessage({ id: 'userSettingsLogoutMenuItemLabel' }),
              link: logoutLink,
            },
          ],
        },
      ]}
    />
  );
};
