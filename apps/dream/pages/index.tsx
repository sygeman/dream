import React from 'react';
import path from 'path';
import { Projects } from '../components/projects';
// Next.js standalone hook
path.resolve('./next.config.js');

export function Index() {
  return <Projects />;
}

export default Index;
