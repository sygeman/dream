'use client';
import { Modal } from '../../components/modal';
import { useModal } from '../../helpers/use-modal';
import { DeleteCommunity } from './delete-community';

export const DeleteCommunityModal = () => {
  const modalProps = useModal();

  return (
    <Modal
      minimal
      id="deleteCommunity"
      title="Delete Community"
      {...modalProps}
    >
      <DeleteCommunity />
    </Modal>
  );
};
