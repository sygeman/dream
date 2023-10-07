'use client';
import { Modal } from '@/components/modal';
import { useModal } from '@/helpers/use-modal';

import { NewChannel } from './new-channel';

export const NewChannelModal = () => {
  const modalProperties = useModal();

  return (
    <Modal id="newChannel" title="New Channel" {...modalProperties}>
      <NewChannel />
    </Modal>
  );
};
