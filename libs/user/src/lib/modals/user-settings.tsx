import React from 'react';
import { useIntl } from 'react-intl';
import { SettingsLayout } from '@dream/layouts/settings';
import { UserSettingsLanguage } from '../settings/language';

export const UserSettingsModal: React.FC = () => {
  const { formatMessage } = useIntl();

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
              query: ({ query }) => {
                const { userSettings, ...q } = query;
                return { ...q, logout: 1 };
              },
            },
          ],
        },
      ]}
    />
  );
};
