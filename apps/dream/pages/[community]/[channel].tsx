import React from 'react';
import { MainLayout } from '../../layouts/main';
import { CommunityLeftPanel } from '@dream/containers/community-left-panel';
import { CommunityContent } from '@dream/containers/community-content';
import { CommunityRightPanel } from '@dream/containers/community-right-panel';

export function ChannelPage() {
  return (
    <MainLayout>
      <CommunityLeftPanel />
      <CommunityContent />
      <CommunityRightPanel />
    </MainLayout>
  );
}

export default ChannelPage;
