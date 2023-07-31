'use client';
import {
  type ReadonlyURLSearchParams,
  usePathname,
  useSearchParams,
} from 'next/navigation';
import type { SettingsMenuItem } from './menu.type';
import { ItemLink } from './item';

type Props = {
  id: string;
  menu: SettingsMenuItem[];
};

export const SettingsMenu = ({ id, menu }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const section = searchParams.get(id);

  const generateLink = (
    searchParams: ReadonlyURLSearchParams,
    pathname: string,
    id: string,
    value: string,
  ) => {
    const newParams = new URLSearchParams(Array.from(searchParams.entries()));
    newParams.set(id, value);
    return `${pathname}?${newParams?.toString()}`;
  };

  return (
    <div className="px-2 divide-y divide-surface-light">
      {menu.map((menuGroup, menuGroupIndex) => (
        <div key={menuGroupIndex} className="py-1.5">
          <div className="text-accent text-xs px-3 font-medium uppercase opacity-75">
            {menuGroup.label}
          </div>
          {menuGroup.items.map((menuItem) => (
            <ItemLink
              key={menuItem.key}
              title={menuItem.label}
              selected={section === menuItem.key}
              link={
                menuItem.link ||
                generateLink(searchParams, pathname, id, menuItem.key)
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
};
