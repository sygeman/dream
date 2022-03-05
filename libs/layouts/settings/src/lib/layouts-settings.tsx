import React from 'react';
import { useModal } from '@dream/utils/use-modal';
import { ModalFull } from '@dream/components/modal-full';
import { SettingsMenu } from './menu';
import type { SettingsMenuItem } from './menu.type';
import { useRouter } from 'next/router';

export interface SettingsLayoutProps {
  id: string;
  menu: SettingsMenuItem[];
}

const getContentByKeyMenu = (menu: SettingsMenuItem[]) => {
  const result: { [key: string]: React.ReactNode } = {};

  menu.forEach((menuItem) => {
    menuItem.items.forEach((item) => {
      if (item?.content) {
        result[item.key] = item.content;
      }
    });
  });

  return result;
};

export const SettingsLayout: React.FC<SettingsLayoutProps> = ({ id, menu }) => {
  const modalProps = useModal();
  const router = useRouter();
  const section = router.query[id] as string;
  const contentByKeyMenu = getContentByKeyMenu(menu);

  return (
    <ModalFull
      id={id}
      menu={<SettingsMenu id={id} menu={menu} />}
      {...modalProps}
    >
      {contentByKeyMenu[section] || null}
    </ModalFull>
  );
};
