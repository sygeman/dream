import React from 'react';
import { useModal } from '@dream/utils-old/use-modal';
import { Modal } from '@dream/components/modal';
import { NewChannel } from '../new';

export const NewChannelModal = () => {
  const modalProps = useModal();

  return (
    <Modal id="newChannel" title="New Channel" {...modalProps}>
      <NewChannel />
    </Modal>
  );
};
