import React from 'react';
import { MainCommunities } from '@dream/community';
import { MainLayout } from '../layouts/main';

export function IndexPage() {
  return (
    <MainLayout>
      <MainCommunities />
    </MainLayout>
  );
}

export default IndexPage;
