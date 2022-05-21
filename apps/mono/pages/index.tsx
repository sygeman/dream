import React from 'react';
import { MainCommunities } from '@dream/mono-community-ui';
import { MainLayout } from '../layouts/main';

export function IndexPage() {
  return (
    <MainLayout>
      <MainCommunities />
    </MainLayout>
  );
}

export default IndexPage;
