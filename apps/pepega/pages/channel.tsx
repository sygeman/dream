import { useRouter } from 'next/router';
import Channel from '@pepega/containers/Channel';
import Layout from '../layouts/Main';

const ChannelPage = () => {
  const router = useRouter();
  const userId = router.query.id;

  if (typeof userId !== 'string') {
    return null;
  }

  return (
    <Layout streams>
      <Channel userId={userId} />
    </Layout>
  );
};

export default ChannelPage;
