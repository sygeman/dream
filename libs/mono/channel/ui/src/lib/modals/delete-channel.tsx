import React from 'react';
import { useModal } from '@dream/mono-utils-use-modal';
import { Modal } from '@dream/mono-components-modal';
import { DeleteChannel } from '../delete';

export const DeleteChannelModal = () => {
  const modalProps = useModal();

  return (
    <Modal id="deleteChannel" title="Delete Channel" minimal {...modalProps}>
      <DeleteChannel />
    </Modal>
  );
};
