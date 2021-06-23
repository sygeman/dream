import React from 'react';
import {
  NewCommunity,
  NewChannel,
  DeleteCommunity,
  CommunitySettings,
  CommunitySettingsMenu,
  ChannelSettings,
  ChannelSettingsMenu,
  DeleteChannel,
} from '@dream/community';
import { UserLogout, UserSettings, UserSettingsMenu } from '@dream/user';
import { useModal } from '@dream/utils/use-modal';
import { useIntl } from 'react-intl';
import { Auth } from '@dream/auth';
import { Modal } from '@dream/components/modal';
import { ModalFull } from '@dream/components/modal-full';
import { ChannelSpotifyModeAddTrack } from '@dream/mode/spotify/ui';
import { ChannelYoutubeModeAddVideo } from '@dream/mode/youtube/ui';

export const Modals = () => {
  const intl = useIntl();
  const modalProps = useModal();

  return (
    <>
      <Modal id="authModal" minimal {...modalProps}>
        <Auth />
      </Modal>
      <Modal
        id="newCommunity"
        title={intl.formatMessage({ id: 'newCommunityModalTitle' })}
        {...modalProps}
      >
        <NewCommunity />
      </Modal>
      <Modal
        id="deleteCommunity"
        title="Delete Community"
        minimal
        {...modalProps}
      >
        <DeleteCommunity />
      </Modal>
      <Modal id="newChannel" title="New Channel" {...modalProps}>
        <NewChannel />
      </Modal>
      <Modal id="deleteChannel" title="Delete Channel" minimal {...modalProps}>
        <DeleteChannel />
      </Modal>
      <Modal id="logout" title="Log Out" minimal {...modalProps}>
        <UserLogout />
      </Modal>
      <Modal
        id="spotifyModeAddTrack"
        title="Add Track To Queue"
        minimal
        {...modalProps}
      >
        <ChannelSpotifyModeAddTrack />
      </Modal>
      <Modal
        id="waitlistYoutubeAddVideo"
        title="Add Video To Queue"
        minimal
        {...modalProps}
      >
        <ChannelYoutubeModeAddVideo />
      </Modal>
      <ModalFull
        id="communitySettings"
        menu={<CommunitySettingsMenu />}
        {...modalProps}
      >
        <CommunitySettings />
      </ModalFull>
      <ModalFull
        id="channelSettings"
        menu={<ChannelSettingsMenu />}
        {...modalProps}
      >
        <ChannelSettings />
      </ModalFull>
      <ModalFull id="userSettings" menu={<UserSettingsMenu />} {...modalProps}>
        <UserSettings />
      </ModalFull>
    </>
  );
};
