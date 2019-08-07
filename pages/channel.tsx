import Channel from '../components/Channel';
import Layout from '../layouts/Main';
import { useRouter } from '../hooks/useRouter';
import { useAccess } from '../hooks/useAccess';

const ChannelPage = () => {
  const router = useRouter();

  return (
    <Layout streams>
      {useAccess() && <Channel userId={router.query.id} />}
    </Layout>
  );
};

export default ChannelPage;
