import useRouter from '../hooks/useRouter';
import Layout from '../layouts/Main';
import { Community } from '../components/Community';
import CommunityProvider from '../providers/Community';

const CommunityPage = () => {
  const router = useRouter();
  const communityId = router.query.id;

  if (typeof communityId !== 'string') {
    return null;
  }

  return (
    <Layout>
      <CommunityProvider id={communityId}>
        {({ community }) => <Community {...community} />}
      </CommunityProvider>
    </Layout>
  );
};

export default CommunityPage;
