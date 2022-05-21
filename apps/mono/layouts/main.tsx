import React from 'react';
import { AppPanel } from '@dream/mono-app-panel';
import { UserSettingsModal } from '@dream/mono-user-ui';
import { LoginModal, LogoutModal } from '@dream/mono-auth-ui';
import {
  NewCommunityModal,
  DeleteCommunityModal,
} from '@dream/mono-community-ui';
import { CommunitySettingsModal } from '@dream/mono-community-settings-ui';
import { ChannelSettingsModal } from '@dream/mono-channel-settings-ui';
import { NewChannelModal, DeleteChannelModal } from '@dream/mono-channel-ui';
import { ConnectionStatus } from '@dream/mono-connection-status-ui';

export const MainLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => (
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
