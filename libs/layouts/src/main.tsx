import React from 'react';
import { AppPanel } from '@dream/containers/app-panel';
import { Modal } from './modal';
import { Auth } from '@dream/auth';
import { NewCommunity, NewChannel } from '@dream/community';

export const MainLayout: React.FC = ({ children }) => {
  return (
    <>
      <div className="h-screen bg-gray-900 flex">
        <AppPanel />
        {children}
      </div>
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
