import React from 'react';
import { MainLayout } from '../../layouts/main';
import { CommunityLeftPanel, CommunityWelcome } from '@dream/mono-community-ui';

export function CommunityPage() {
  return (
    <MainLayout>
      <CommunityLeftPanel />
      <CommunityWelcome />
    </MainLayout>
  );
}

export default CommunityPage;
