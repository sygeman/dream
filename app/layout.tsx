import './globals.css';

import { Locale } from '@prisma/client';
import { type PropsWithChildren } from 'react';

import { ThemeProvider } from '@/components/theme-provider';
import { IntlProvider } from '@/libs/intl';

import { getCurretUserId } from '../helpers/get-current-user';
import { prisma } from '../libs/prisma';
import { AppPanel } from './app-panel/app-panel';
import { ChannelSettingsModal } from './channel-settings/modal';
import { CommunitySettingsModal } from './community-settings/modal';
import { DeleteChannelModal } from './delete-channel/delete-channel';
import { DeleteCommunityModal } from './delete-community/delete-community';
import { roboto } from './fonts';
import { LoginModal } from './login/login';
import { LogoutModal } from './logout/logout';
import { NewChannelModal } from './new-channel/new-channel';
import { NewCommunityModal } from './new-community/new-community';
import { UserSettingsModal } from './user-settings/modal';

type Properties = PropsWithChildren;

const MainLayout = async ({ children }: Properties) => {
  const userId = await getCurretUserId();
  const user = await prisma.user.findFirst({ where: { id: userId } });
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
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <IntlProvider locale={locale}>
            <div className="h-screen bg-background flex">
              <AppPanel />
              <div className="flex flex-1 h-full overflow-hidden rounded-l-xl ">
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
        </ThemeProvider>
      </body>
    </html>
  );
};

export default MainLayout;
