import useRouter from '../lib/useRouter';
import Layout from '../layouts/Main';
import { Community } from '../components/Community';

const CommunityPage = () => {
  const router = useRouter();
  const communityId = router.query.id;

  if (typeof communityId !== 'string') {
    return null;
  }

  return (
    <Layout>
      <Community id={communityId} />}
    </Layout>
  );
};

export default CommunityPage;
