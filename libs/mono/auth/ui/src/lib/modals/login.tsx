import React from 'react';
import { useModal } from '@dream/mono-utils-use-modal';
import { Modal } from '@dream/mono-components-modal';
import { AuthButtonTwitch, AuthButtonSpotify } from '../button';

export const LoginModal = () => {
  const modalProps = useModal();

  return (
    <Modal id="authModal" minimal {...modalProps}>
      <div className="flex flex-col px-4 py-2">
        <AuthButtonTwitch />
        <AuthButtonSpotify />
      </div>
    </Modal>
  );
};
