'use client';
import { Modal } from '@/components/modal';
import { useModal } from '@/helpers/use-modal';

import { DeleteChannel } from './delete-channel';

export const DeleteChannelModal = () => {
  const modalProperties = useModal();

  return (
    <Modal
      id="deleteChannel"
      title="Delete Channel"
      minimal
      {...modalProperties}
    >
      <DeleteChannel />
    </Modal>
  );
};
