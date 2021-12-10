import React from 'react';
import { useIntl } from 'react-intl';
import { Modal } from '@dream/components/modal';
import { useModal } from '@dream/utils-old/use-modal';
import { NewCommunity } from '../new-community';

export const NewCommunityModal = () => {
  const intl = useIntl();
  const modalProps = useModal();

  return (
    <Modal
      id="newCommunity"
      title={intl.formatMessage({ id: 'newCommunityModalTitle' })}
      {...modalProps}
    >
      <NewCommunity />
    </Modal>
  );
};
