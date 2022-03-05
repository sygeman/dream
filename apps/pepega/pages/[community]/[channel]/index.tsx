import React from 'react';
import { MainLayout } from '../../../layouts/main';
import { CommunityLeftPanel, CommunityRightPanel } from '@dream/community';
import { ChannelContent } from '@dream/channel/ui';

export function CommunityChannelPage() {
  return (
    <MainLayout>
      <CommunityLeftPanel />
      <ChannelContent />
      <CommunityRightPanel />
    </MainLayout>
  );
}

export default CommunityChannelPage;
