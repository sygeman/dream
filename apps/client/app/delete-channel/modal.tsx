'use client';
import { Modal } from 'apps/client/components/modal';
import { useModal } from 'apps/client/helpers/use-modal';
import { DeleteChannel } from './delete-channel';

export const DeleteChannelModal = () => {
  const modalProps = useModal();

  return (
    <Modal id="deleteChannel" title="Delete Channel" minimal {...modalProps}>
      <DeleteChannel />
    </Modal>
  );
};
