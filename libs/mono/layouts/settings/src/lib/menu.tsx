import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { SettingsMenuItem } from './menu.type';

const ItemLink: React.FC<{
  title: string;
  selected: boolean;
  query: (r: any) => { [key: string]: any };
}> = ({ title, selected = false, query = () => ({}) }) => {
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

export const SettingsMenu: React.FC<{
  id: string;
  menu: SettingsMenuItem[];
}> = ({ id, menu }) => {
  const router = useRouter();
  const section = router.query[id];

  return (
    <div className="px-2 divide-y divide-surface-light">
      {menu.map((menuGroup, menuGroupIndex) => (
        <div key={menuGroupIndex} className="py-1.5">
          <div className="text-accent text-xs px-3 font-medium uppercase opacity-75">
            {menuGroup.label}
          </div>
          {menuGroup.items.map((menuItem) => {
            return (
              <ItemLink
                key={menuItem.key}
                title={menuItem.label}
                selected={section === menuItem.key}
                query={({ query }) =>
                  menuItem?.query
                    ? menuItem?.query({ query })
                    : { ...query, [id]: menuItem.key }
                }
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
