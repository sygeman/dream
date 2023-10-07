import { type ReactNode } from 'react';

import type { SettingsMenuItem } from './menu.type';

export const getContentByKeyMenu = (menu: SettingsMenuItem[]) => {
  const result: { [key: string]: ReactNode } = {};

  for (const menuItem of menu) {
    for (const item of menuItem.items) {
      if (item?.content) {
        result[item.key] = item.content;
      }
    }
  }

  return result;
};
