import { type ReactNode } from 'react';

export type SettingsMenuItem = {
  label?: string;
  items: {
    key: string;
    label: string;
    content?: ReactNode;
    link?: string;
  }[];
};
