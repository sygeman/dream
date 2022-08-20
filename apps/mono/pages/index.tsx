import React from 'react';
import { MainCommunities } from '@dream/mono-community-ui';
import { MainLayout } from '../layouts/main';
import path from 'path';
// Next.js standalone hook
path.resolve('./next.config.js');

export function IndexPage() {
  return (
    <MainLayout>
      <MainCommunities />
    </MainLayout>
  );
}

export default IndexPage;
