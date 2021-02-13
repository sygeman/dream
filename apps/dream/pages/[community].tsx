import React from 'react';
import { MainLayout } from '../layouts/main';
import { CommunityLeftPanel } from '@dream/containers/community-left-panel';

export function CommunityPage() {
  return (
    <MainLayout>
      <CommunityLeftPanel />
    </MainLayout>
  );
}

export default CommunityPage;
