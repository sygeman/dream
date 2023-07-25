import React from 'react';
import { useModal } from 'apps/client/helpers/use-modal';
import { Modal } from 'apps/client/components/modal';
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
