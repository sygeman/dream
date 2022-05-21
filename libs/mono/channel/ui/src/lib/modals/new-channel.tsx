import React from 'react';
import { useModal } from '@dream/mono-utils-use-modal';
import { Modal } from '@dream/mono-components-modal';
import { NewChannel } from '../new';

export const NewChannelModal = () => {
  const modalProps = useModal();

  return (
    <Modal id="newChannel" title="New Channel" {...modalProps}>
      <NewChannel />
    </Modal>
  );
};
