'use client';
import { Modal } from 'apps/client/components/modal';
import { useModal } from 'apps/client/helpers/use-modal';
import { NewChannel } from './new-channel';

export const NewChannelModal = () => {
  const modalProps = useModal();

  return (
    <Modal id="newChannel" title="New Channel" {...modalProps}>
      <NewChannel />
    </Modal>
  );
};
