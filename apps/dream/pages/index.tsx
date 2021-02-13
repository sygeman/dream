import React from 'react';
import { MainLayout } from '../layouts/main';
import { MainCommunities } from '@dream/containers/main-communities';

export function IndexPage() {
  return (
    <MainLayout>
      <MainCommunities />
    </MainLayout>
  );
}

export default IndexPage;
