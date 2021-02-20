import React from 'react';
import { Modal } from './modal';
import { Auth } from '@dream/auth';
import { NewCommunity, NewChannel } from '@dream/community';

export const Modals = () => {
  return (
    <>
      <Modal routerKey="authModal" minimal>
        <Auth />
      </Modal>
      <Modal routerKey="newCommunity" title="New Community">
        <NewCommunity />
      </Modal>
      <Modal routerKey="newChannel" title="New Channel">
        <NewChannel />
      </Modal>
    </>
  );
};
