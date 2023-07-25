import React from 'react';
import { useModal } from 'apps/client/helpers/use-modal';
import { Modal } from 'apps/client/components/modal';
import { ChannelYoutubeModeAddVideo } from '../add-video';

export const YoutubeModeAddVideoModal = () => {
  const modalProps = useModal();

  return (
    <Modal
      id="waitlistYoutubeAddVideo"
      title="Add Video To Queue"
      minimal
      {...modalProps}
    >
      <ChannelYoutubeModeAddVideo />
    </Modal>
  );
};
