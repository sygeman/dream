import { Clips } from '@dream/pepega/clip/ui';
import { MainLayout } from '@dream/pepega/layouts/main';
import path from 'path';
// Next.js standalone hook
path.resolve('./next.config.js');

const IndexPage = () => {
  return (
    <MainLayout>
      <Clips />
    </MainLayout>
  );
};

export default IndexPage;
