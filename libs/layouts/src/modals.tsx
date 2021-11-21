import React from 'react';
import { UserSettingsModal } from '@dream/user';
import { LoginModal, LogoutModal } from '@dream/auth';
import { SpotifyModeAddTrackModal } from '@dream/mode/spotify/ui';
import { YoutubeModeAddVideoModal } from '@dream/mode/youtube/ui';
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

export const Modals = () => (
  <>
    <LoginModal />
    <LogoutModal />
    <UserSettingsModal />

    <NewCommunityModal />
    <DeleteCommunityModal />
    <CommunitySettingsModal />

    <NewChannelModal />
    <DeleteChannelModal />
    <ChannelSettingsModal />

    <SpotifyModeAddTrackModal />
    <YoutubeModeAddVideoModal />
  </>
);
