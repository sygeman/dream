import React from 'react';
import { Modal } from './modal';

export const Modals = () => {
  return (
    <>
      <Modal routerKey="authModal" minimal>
        <div className="text-white">Auth</div>
      </Modal>
      <Modal routerKey="newCommunity" title="New Community">
        <div className="text-white">New Community</div>
      </Modal>
    </>
  );
};
