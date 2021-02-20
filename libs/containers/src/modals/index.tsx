import React from 'react';
import { Modal } from './modal';
import { Auth } from '@dream/auth';
import { NewChannel } from '@dream/community';

export const Modals = () => {
  return (
    <>
      <Modal routerKey="authModal" minimal>
        <Auth />
      </Modal>
      <Modal routerKey="newCommunity" title="New Community">
        <div className="text-white">New Community</div>
      </Modal>
      <Modal routerKey="newChannel" title="New Channel">
        <NewChannel />
      </Modal>
    </>
  );
};
