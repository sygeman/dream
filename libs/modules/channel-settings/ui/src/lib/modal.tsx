import React from 'react';
import { useModal } from '@dream/utils/use-modal';
import { ModalFull } from '@dream/components/modal-full';
import { ChannelSettings } from './channel-settings';
import { ChannelSettingsMenu } from './menu';

export const ChannelSettingsModal: React.FC = () => {
  const modalProps = useModal();

  return (
    <ModalFull
      id="channelSettings"
      menu={<ChannelSettingsMenu />}
      {...modalProps}
    >
      <ChannelSettings />
    </ModalFull>
  );
};
