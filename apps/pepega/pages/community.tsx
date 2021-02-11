import { useRouter } from 'next/router';
import CommunityLayout from 'src/layouts/Community';
import { Community } from 'src/containers/Community';

const CommunityPage = () => {
  const router = useRouter();
  const communityId = router.query.id;

  if (typeof communityId !== 'string') {
    return null;
  }

  return (
    <CommunityLayout>
      <Community id={communityId} />
    </CommunityLayout>
  );
};

export default CommunityPage;
