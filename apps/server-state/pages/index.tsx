import { MainLayout } from '@dream/server-state/layouts/main';
import { ProjectsList } from '@dream/server-state/project/ui';

const IndexPage = () => {
  return (
    <MainLayout>
      <ProjectsList />
    </MainLayout>
  );
};

export default IndexPage;
