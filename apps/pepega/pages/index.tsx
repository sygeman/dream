import { Clips } from '../components/clips';
import { MainLayout } from '../layouts/main';
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
