import { type PropsWithChildren } from 'react';
import { AppPanel } from './app-panel/app-panel';
import './global.css';
import { roboto } from './fonts';

type Props = PropsWithChildren;

const MainLayout = ({ children }: Props) => {
  return (
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

          {/* <LoginModal />
      <LogoutModal />
      <UserSettingsModal />

      <NewCommunityModal />
      <DeleteCommunityModal />
      <CommunitySettingsModal />

      <NewChannelModal />
      <DeleteChannelModal />
      <ChannelSettingsModal />  */}

          {/* <ConnectionStatus /> */}
        </div>
      </body>
    </html>
  );
};

export default MainLayout;
