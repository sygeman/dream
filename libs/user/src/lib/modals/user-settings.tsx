import React from 'react';
import { useModal } from '@dream/utils-old/use-modal';
import { ModalFull } from '@dream/components/modal-full';
import { UserSettings } from '../settings';
import { UserSettingsMenu } from '../settings/menu';

export const UserSettingsModal = () => {
  const modalProps = useModal();

  return (
    <ModalFull id="userSettings" menu={<UserSettingsMenu />} {...modalProps}>
      <UserSettings />
    </ModalFull>
  );
};
