import { useRouter } from 'next/router';
import Channel from 'src/containers/Channel';
import Layout from 'src/layouts/Main';

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
