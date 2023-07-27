'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { SettingsLayout } from 'apps/client/components/settings/layouts-settings';
import { UserSettingsLanguage } from './language';
import { useMemo } from 'react';
import { useIntl } from 'apps/client/libs/intl';

const UserSettingsModal = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { formatMessage } = useIntl();

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

export default UserSettingsModal;
