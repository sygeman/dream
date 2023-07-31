import { type ReactNode } from 'react';
import type { SettingsMenuItem } from './menu.type';

export const getContentByKeyMenu = (menu: SettingsMenuItem[]) => {
  const result: { [key: string]: ReactNode } = {};

  menu.forEach((menuItem) => {
    menuItem.items.forEach((item) => {
      if (item?.content) {
        result[item.key] = item.content;
      }
    });
  });

  return result;
};
