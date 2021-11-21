import React from 'react';
import { MainCommunities } from '@dream/community';
import { AppPanel } from '@dream/app-panel';
import { Modals } from '@dream/layouts/modals';

export function IndexPage() {
  return (
    <div className="h-screen bg-background flex">
      <AppPanel />
      <div className="flex flex-1 h-full overflow-hidden rounded-l-xl">
        <MainCommunities />
      </div>
      <Modals />
    </div>
  );
}

export default IndexPage;
