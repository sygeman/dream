import React from 'react';
import { useModal } from '@dream/utils/use-modal';
import { Modal } from '@dream/components/modal';
import { ChannelSpotifyModeAddTrack } from '../add-track';

export const SpotifyModeAddTrackModal = () => {
  const modalProps = useModal();

  return (
    <Modal
      id="spotifyModeAddTrack"
      title="Add Track To Queue"
      minimal
      {...modalProps}
    >
      <ChannelSpotifyModeAddTrack />
    </Modal>
  );
};
