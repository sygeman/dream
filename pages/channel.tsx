import Channel from '../components/Channel';
import Layout from '../layouts/Main';
import useRouter from '../hooks/useRouter';

const ChannelPage = () => {
  const router = useRouter();

  return (
    <Layout>
      <Channel userId={router.query.id} />
    </Layout>
  );
};

export default ChannelPage;
