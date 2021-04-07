import React from 'react';
import { MainLayout } from '@dream/layouts/main';
import { ChannelSettings } from '@dream/community';

export function CommunityChannelSettingsPage() {
  return (
    <MainLayout>
      <div className="h-screen w-full flex flex-1 items-center justify-center">
        <div className="bg-surface w-full h-full border-l-2 border-backgorud p-2 max-w-2xl rounded overflow-hidden">
          <ChannelSettings />
        </div>
      </div>
    </MainLayout>
  );
}

export default CommunityChannelSettingsPage;
