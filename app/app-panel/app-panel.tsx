import { getServerSession } from 'next-auth';
import React from 'react';

import { authOptions } from '@/config/next-auth';

import { AppPanelCommunities } from './app-panel-communities';
import { Logo } from './logo';
import { UserPanel } from './user-panel/user-panel';

export const AppPanel = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-screen flex flex-col shrink-0 min-w-12 bg-background overflow-hidden">
      <Logo />
      <AppPanelCommunities />
      <UserPanel user={session?.user} />
    </div>
  );
};
