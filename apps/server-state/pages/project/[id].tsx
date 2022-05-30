import { useRouter } from 'next/router';
import { Project } from '@dream/server-state/project/ui';
import { MainLayout } from '@dream/server-state/layouts/main';

const ProjectPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <MainLayout>
      <Project id={id} />
    </MainLayout>
  );
};

export default ProjectPage;
