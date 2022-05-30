import { useRouter } from 'next/router';
import { Project } from '@dream/server-state/project/ui';

const ProjectPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  return <Project id={id} />;
};

export default ProjectPage;
