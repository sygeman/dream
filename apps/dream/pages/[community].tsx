import React from 'react';
import { MainLayout } from '@dream/layouts/main';
import { CommunityLeftPanel } from '@dream/containers/community-left-panel';
import { CommunityWelcome } from '@dream/containers/community-welcome';

export function CommunityPage() {
  return (
    <MainLayout>
      <CommunityLeftPanel />
      <CommunityWelcome />
    </MainLayout>
  );
}

export default CommunityPage;
