import { Clips } from '../components/clips';
import { useSession } from 'next-auth/react';
import { MainLayout } from '@dream/pepega/layouts/main';
import path from 'path';
// Next.js standalone hook
path.resolve('./next.config.js');

const IndexPage = () => {
  const { data: session, status } = useSession();

  console.log(session, status);

  return (
    <MainLayout>
      <Clips />
    </MainLayout>
  );
};

export default IndexPage;
