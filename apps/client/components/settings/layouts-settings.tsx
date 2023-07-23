'use client';
import { useModal } from '../../helpers/use-modal';
import { ModalFull } from '../modal-full';
import { SettingsMenu } from './menu';
import type { SettingsMenuItem } from './menu.type';
import { getContentByKeyMenu } from './get-content-by-key-menu';
import { useSearchParams } from 'next/navigation';

type Props = {
  id: string;
  menu: SettingsMenuItem[];
};

export const SettingsLayout = ({ id, menu }: Props) => {
  const modalProps = useModal();
  const searchParams = useSearchParams();
  const section = searchParams.get(id);
  const contentByKeyMenu = getContentByKeyMenu(menu);

  return (
    <ModalFull
      id={id}
      menu={<SettingsMenu id={id} menu={menu} />}
      {...modalProps}
    >
      {(section && contentByKeyMenu[section]) || null}
    </ModalFull>
  );
};
