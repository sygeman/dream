import { type PropsWithChildren } from 'react';
import { AppPanel } from './app-panel/app-panel';
import './global.css';
// import 'overlayscrollbars/overlayscrollbars.css';
// import 'rc-slider/assets/index.css';
import { roboto } from './fonts';
import { LoginModal } from './modals/login';
import { LogoutModal } from './modals/logout';
import { UserSettingsModal } from './modals/user-settings/modal';
import { NewCommunityModal } from './modals/new-community/modal';
import { DeleteCommunityModal } from './modals/delete-community/modal';
import { CommunitySettingsModal } from './modals/community-settings/modal';
import { NewChannelModal } from './modals/new-channel/modal';
import { DeleteChannelModal } from './modals/delete-channel/modal';
import { ChannelSettingsModal } from './modals/channel-settings/modal';

type Props = PropsWithChildren;

const MainLayout = ({ children }: Props) => (
  <html className={roboto.className}>
    <head>
      <title>Mono</title>
      <link
        rel="icon"
        type="image/png"
        href="/favicon-32x32.png"
        sizes="32x32"
      />
      <link
        rel="icon"
        type="image/png"
        href="/favicon-16x16.png"
        sizes="16x16"
      />
    </head>
    <body>
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
      </div>
    </body>
  </html>
);

export default MainLayout;
