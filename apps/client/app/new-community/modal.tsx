'use client';
import { Modal } from '../../components/modal';
import { useModal } from '../../helpers/use-modal';
import { NewCommunity } from './new-community';

export const NewCommunityModal = () => {
  const modalProps = useModal();

  return (
    <Modal id="newCommunity" title="New community" {...modalProps}>
      <NewCommunity />
    </Modal>
  );
};
