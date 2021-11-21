import React from 'react';
import { MainLayout } from '@dream/layouts/main';
import { CommunityLeftPanel, CommunityWelcome } from '@dream/community';

export function CommunityPage() {
  return (
    <MainLayout>
      <CommunityLeftPanel />
      <CommunityWelcome />
    </MainLayout>
  );
}

export default CommunityPage;
