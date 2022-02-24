import React from 'react';
import { AppPanel } from '@dream/app-panel';
import { UserSettingsModal } from '@dream/user';
import { LoginModal, LogoutModal } from '@dream/auth';
import {
  NewCommunityModal,
  DeleteCommunityModal,
  CommunitySettingsModal,
} from '@dream/community';
import {
  NewChannelModal,
  DeleteChannelModal,
  ChannelSettingsModal,
} from '@dream/channel/ui';
import { ConnectionStatus } from '@dream/modules/connection-status';

export const MainLayout: React.FC = ({ children }) => (
  <div className="h-screen bg-background flex">
    <AppPanel />
    <div className="flex flex-1 h-full overflow-hidden rounded-l-xl">
      {children}
    </div>

    <LoginModal />
    <LogoutModal />
    <UserSettingsModal />

    <NewCommunityModal />
    <DeleteCommunityModal />
    <CommunitySettingsModal />

    <NewChannelModal />
    <DeleteChannelModal />
    <ChannelSettingsModal />

    <ConnectionStatus />
  </div>
);
