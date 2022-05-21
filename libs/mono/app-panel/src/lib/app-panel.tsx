import React from 'react';
import Link from 'next/link';
import { UserPanel } from '@dream/mono-user-ui';
import { AppPanelCommunities } from '@dream/mono-community-ui';

const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center justify-center w-12 h-12 p-2 cursor-pointer relative">
        <img src="/pepega.png" alt="" />
      </div>
    </Link>
  );
};

// logo
// followed-channels
// friends
// user-nav

export const AppPanel = () => {
  return (
    <div className="h-screen flex flex-col shrink-0 min-w-12 bg-background border-r border-background overflow-hidden">
      <Logo />
      <AppPanelCommunities />
      <UserPanel />
    </div>
  );
};
