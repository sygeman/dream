'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { SettingsLayout } from '../../components/settings/layouts-settings';
import { UserSettingsLanguage } from './language';
import { useMemo } from 'react';

export const UserSettingsModal = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const logoutLink = useMemo(() => {
    const newParams = new URLSearchParams(Array.from(searchParams.entries()));
    newParams.delete('userSettings');
    newParams.set('logout', '1');
    return `${pathname}?${newParams?.toString()}`;
  }, [searchParams]);

  return (
    <SettingsLayout
      id="userSettings"
      menu={[
        {
          label: 'User Settings',
          items: [
            {
              key: 'language',
              label: 'Language',
              content: <UserSettingsLanguage />,
            },
          ],
        },
        {
          items: [
            {
              key: 'logout',
              label: 'Logout',
              link: logoutLink,
            },
          ],
        },
      ]}
    />
  );
};
