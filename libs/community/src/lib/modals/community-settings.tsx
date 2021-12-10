import React from 'react';
import { useModal } from '@dream/utils/use-modal';
import { ModalFull } from '@dream/components/modal-full';
import { CommunitySettings } from '../community-settings';
import { CommunitySettingsMenu } from '../community-settings/menu';

export const CommunitySettingsModal = () => {
  const modalProps = useModal();

  return (
    <ModalFull
      id="communitySettings"
      menu={<CommunitySettingsMenu />}
      {...modalProps}
    >
      <CommunitySettings />
    </ModalFull>
  );
};
