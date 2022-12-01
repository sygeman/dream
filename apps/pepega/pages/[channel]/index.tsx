import { useRouter } from 'next/router';
import { Clips } from '../../components/clips';
import { MainLayout } from '../../layouts/main';

const ChannelPage = () => {
  const router = useRouter();
  const userId =
    typeof router?.query?.channel === 'string'
      ? router?.query?.channel
      : undefined;

  return (
    <MainLayout>
      <Clips userId={userId} />
    </MainLayout>
  );
};

export default ChannelPage;
