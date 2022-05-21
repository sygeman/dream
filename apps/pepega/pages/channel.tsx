import { useRouter } from 'next/router';
import { Channel } from '@dream/pepega/containers-old';
import { MainLayout } from '@dream/pepega/layouts/main';

const ChannelPage = () => {
  const router = useRouter();
  const userId = router.query.id;

  if (typeof userId !== 'string') {
    return null;
  }

  return (
    <MainLayout streams>
      <Channel userId={userId} />
    </MainLayout>
  );
};

export default ChannelPage;
