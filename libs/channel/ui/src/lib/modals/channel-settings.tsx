import React from 'react';
import { ChannelSettings, ChannelSettingsMenu } from '@dream/channel/ui';
import { useModal } from '@dream/utils/use-modal';
import { ModalFull } from '@dream/components/modal-full';

export const ChannelSettingsModal = () => {
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
