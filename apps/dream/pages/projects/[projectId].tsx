import { useRouter } from 'next/router';
import React from 'react';
import { Project } from '../../components/project';

export function ProjectPage() {
  const router = useRouter();
  const projectId = router?.query['projectId'] as string;

  return <Project projectId={projectId} />;
}

export default ProjectPage;
