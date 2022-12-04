import { useRouter } from 'next/router';
import { Clips } from '../../components/clips';
import { MainLayout } from '../../layouts/main';

const ChannelPage = () => {
  const { query } = useRouter();
  const userId =
    typeof query?.channel === 'string' ? query?.channel : undefined;

  return (
    <MainLayout>
      <Clips userId={userId} />
    </MainLayout>
  );
};

export default ChannelPage;
