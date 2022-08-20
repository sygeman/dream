import React from 'react';
import { MainLayout } from '../../../layouts/main';
import {
  CommunityLeftPanel,
  CommunityRightPanel,
} from '@dream/mono-community-ui';
import { ChannelContent } from '@dream/mono-channel-ui';

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
