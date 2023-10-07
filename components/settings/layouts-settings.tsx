'use client';
import { useSearchParams } from 'next/navigation';

import { useModal } from '../../helpers/use-modal';
import { ModalFull } from '../modal-full';
import { getContentByKeyMenu } from './get-content-by-key-menu';
import { SettingsMenu } from './menu';
import type { SettingsMenuItem } from './menu.type';

type Properties = {
  id: string;
  menu: SettingsMenuItem[];
};

export const SettingsLayout = ({ id, menu }: Properties) => {
  const modalProperties = useModal();
  const searchParameters = useSearchParams();
  const section = searchParameters.get(id);
  const contentByKeyMenu = getContentByKeyMenu(menu);

  return (
    <ModalFull
      id={id}
      menu={<SettingsMenu id={id} menu={menu} />}
      {...modalProperties}
    >
      {(section && contentByKeyMenu[section]) || undefined}
    </ModalFull>
  );
};
