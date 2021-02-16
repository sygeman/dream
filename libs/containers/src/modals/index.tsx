import React from 'react';
import { Modal } from './modal';
import { Auth } from '@dream/auth';

export const Modals = () => {
  return (
    <>
      <Modal routerKey="authModal" minimal>
        <Auth />
      </Modal>
      <Modal routerKey="newCommunity" title="New Community">
        <div className="text-white">New Community</div>
      </Modal>
    </>
  );
};
