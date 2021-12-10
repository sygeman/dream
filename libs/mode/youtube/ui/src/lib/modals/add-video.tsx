import React from 'react';
import { useModal } from '@dream/utils-old/use-modal';
import { Modal } from '@dream/components/modal';
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
