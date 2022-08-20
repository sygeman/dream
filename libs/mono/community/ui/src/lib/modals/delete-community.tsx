import React from 'react';
import { Modal } from '@dream/mono-components-modal';
import { useModal } from '@dream/mono-utils-use-modal';
import { DeleteCommunity } from '../delete-community';

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
