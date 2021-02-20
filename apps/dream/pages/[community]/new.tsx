import React from 'react';
import { MainLayout } from '@dream/layouts/main';
import { CommunityLeftPanel, NewChannel } from '@dream/community';

export function CommunityChannelPage() {
  return (
    <MainLayout>
      <CommunityLeftPanel />
      <div className="h-screen w-full flex flex-1 items-center justify-center">
        <div className="bg-surface w-full border-l-2 border-background p-2 max-w-xl rounded overflow-hidden">
          <NewChannel />
        </div>
      </div>
    </MainLayout>
  );
}

export default CommunityChannelPage;
