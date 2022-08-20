import { Clips } from '@dream/pepega/clip/ui';
import { MainLayout } from '@dream/pepega/layouts/main';
import { useRouter } from 'next/router';

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
