import { type PropsWithChildren } from 'react';
import { AppPanel } from './app-panel/app-panel';
import './global.css';
// import 'overlayscrollbars/overlayscrollbars.css';
// import 'rc-slider/assets/index.css';
import { roboto } from './fonts';
import { LoginModal } from './login/modal';
import { LogoutModal } from './logout/modal';
import { UserSettingsModal } from './user-settings/modal';
import { NewCommunityModal } from './new-community/modal';
import { DeleteCommunityModal } from './delete-community/modal';
import { CommunitySettingsModal } from './community-settings/modal';
import { NewChannelModal } from './new-channel/modal';
import { DeleteChannelModal } from './delete-channel/modal';
import { ChannelSettingsModal } from './channel-settings/modal';
import { Locale } from '@prisma/client';
import { prisma } from '../libs/prisma';
import { IntlProvider } from 'apps/client/libs/intl';
import { authOptions } from '../helpers/auth-options';
import { getServerSession } from 'next-auth';

type Props = PropsWithChildren;

const MainLayout = async ({ children }: Props) => {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findFirst({ where: { id: session?.user.id } });
  const locale = user?.locale || Locale.en_US;

  return (
    <html className={roboto.className}>
      <head>
        <title>Dream</title>
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
        <IntlProvider locale={locale}>
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
        </IntlProvider>
      </body>
    </html>
  );
};

export default MainLayout;
