import React from 'react';
import { AppPanel } from '@dream/app-panel';
import { Modal } from './modal';
import { Auth } from '@dream/auth';
import { NewCommunity, NewChannel } from '@dream/community';
import { useIntl } from 'react-intl';

export const MainLayout: React.FC = ({ children }) => {
  const intl = useIntl();

  return (
    <>
      <div className="h-screen bg-backgorud flex">
        <AppPanel />
        {children}
      </div>
      <Modal routerKey="authModal" minimal>
        <Auth />
      </Modal>
      <Modal
        routerKey="newCommunity"
        title={intl.formatMessage({ id: 'newCommunityModalTitle' })}
      >
        <NewCommunity />
      </Modal>
      <Modal routerKey="newChannel" title="New Channel">
        <NewChannel />
      </Modal>
    </>
  );
};
