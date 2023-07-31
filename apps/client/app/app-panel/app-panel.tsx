import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from 'apps/client/config/next-auth';
import { UserPanel } from './user-panel/user-panel';
import { AppPanelCommunities } from './app-panel-communities';
import { Logo } from './logo';

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
