import React from 'react';
import { AppPanel } from '@dream/app-panel';
import {
  NewCommunity,
  NewChannel,
  ChannelSettings,
  ChannelSettingsMenu,
  DeleteChannel,
} from '@dream/community';
import { useIntl } from 'react-intl';
import { Auth } from '@dream/auth';
import { Modal } from './modal';
import { ModalFull } from './modal-full';

export const MainLayout: React.FC = ({ children }) => {
  const intl = useIntl();

  return (
    <>
      <div className="h-screen bg-backgorud flex">
        <AppPanel />
        <div className="flex flex-1 h-full overflow-hidden rounded-l-xl">
          {children}
        </div>
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
      <Modal routerKey="deleteChannel" title="Delete Channel" minimal>
        <DeleteChannel />
      </Modal>
      <ModalFull routerKey="channelSettings" menu={<ChannelSettingsMenu />}>
        <ChannelSettings />
      </ModalFull>
    </>
  );
};
