'use client';
import {
  type ReadonlyURLSearchParams,
  usePathname,
  useSearchParams,
} from 'next/navigation';

import { ItemLink } from './item';
import type { SettingsMenuItem } from './menu.type';

type Properties = {
  id: string;
  menu: SettingsMenuItem[];
};

const generateLink = (
  searchParameters_: ReadonlyURLSearchParams,
  pathname: string,
  id: string,
  value: string
) => {
  const newParameters = new URLSearchParams([...searchParameters_.entries()]);
  newParameters.set(id, value);
  return `${pathname}?${newParameters?.toString()}`;
};

export const SettingsMenu = ({ id, menu }: Properties) => {
  const pathname = usePathname();
  const searchParameters = useSearchParams();
  const section = searchParameters.get(id);

  return (
    <div className="px-2 divide-y divide-zinc-900-light">
      {menu.map((menuGroup, menuGroupIndex) => (
        <div key={menuGroupIndex} className="py-1.5">
          <div className="text-muted-foreground text-xs px-3 font-medium uppercase opacity-75">
            {menuGroup.label}
          </div>
          {menuGroup.items.map((menuItem) => (
            <ItemLink
              key={menuItem.key}
              title={menuItem.label}
              selected={section === menuItem.key}
              link={
                menuItem.link ||
                generateLink(searchParameters, pathname, id, menuItem.key)
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
};
