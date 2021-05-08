import React from 'react';
import Link from 'next/link';
import { UserPanel } from '@dream/user';
import { AppPanelCommunities } from '@dream/community';

const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center justify-center w-12 h-12 p-2 cursor-pointer relative">
        <img src="/pepega.png" alt="" />
      </div>
    </Link>
  );
};

export const AppPanel = () => {
  return (
    <div className="h-screen flex flex-col flex-shrink-0 min-w-12 bg-backgorud border-r border-backgorud overflow-hidden">
      <Logo />
      <AppPanelCommunities />
      <UserPanel />
    </div>
  );
};
