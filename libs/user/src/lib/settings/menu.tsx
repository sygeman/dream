import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

const ItemLink = ({ title, selected = false, query = (r) => ({}) }) => {
  const router = useRouter();

  return (
    <div>
      <Link href={{ pathname: router.pathname, query: query(router) }} passHref>
        <a
          href="replace"
          className={clsx(
            'btn w-full justify-start my-0.5',
            selected ? 'bg-surface text-white' : 'text-accent'
          )}
        >
          {title}
        </a>
      </Link>
    </div>
  );
};

const Divider = () => <div className="border-b border-surface-light m-1.5" />;

export const UserSettingsMenu: React.FC = () => {
  const router = useRouter();
  const { formatMessage } = useIntl();
  const section = router.query['userSettings'];

  return (
    <div className="px-2">
      <div className="text-accent text-xs px-3 mb-2 font-medium uppercase opacity-75">
        {formatMessage({ id: 'userSettingsMenuLabel' })}
      </div>
      {/* <ItemLink
        title={formatMessage({ id: 'userSettingsOverviewMenuItemLabel' })}
        selected={section === 'overview'}
        query={({ query }) => ({ ...query, userSettings: 'overview' })}
      />
      <Divider /> */}
      <ItemLink
        title={formatMessage({ id: 'userSettingsLanguageMenuItemLabel' })}
        selected={section === 'language'}
        query={({ query }) => ({ ...query, userSettings: 'language' })}
      />
      <Divider />
      <ItemLink
        title={formatMessage({ id: 'userSettingsLogoutMenuItemLabel' })}
        query={({ query }) => {
          const { userSettings, ...q } = query;
          return { ...q, logout: 1 };
        }}
      />
    </div>
  );
};
