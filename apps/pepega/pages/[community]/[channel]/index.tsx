import React from 'react';
import { MainLayout } from '@dream/layouts/main';
import {
  CommunityLeftPanel,
  CommunityContent,
  CommunityRightPanel,
} from '@dream/community';

export function CommunityChannelPage() {
  return (
    <MainLayout>
      <CommunityLeftPanel />
      <CommunityContent />
      <CommunityRightPanel />
    </MainLayout>
  );
}

export default CommunityChannelPage;
