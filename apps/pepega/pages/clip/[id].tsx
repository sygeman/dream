import { useRouter } from 'next/router';
import { Clip } from '@dream/pepega/clip/ui';
import { MainLayout } from '@dream/pepega/layouts/main';

const ClipPage = () => {
  const router = useRouter();
  const clipId = router.query.id;

  if (typeof clipId !== 'string') {
    return null;
  }

  return (
    <MainLayout>
      <div className="flex w-full justify-center">
        <div className="flex flex-1 m-4 max-w-[1200px]">
          <div className="flex flex-1 px-5">
            <Clip clipId={clipId} />
          </div>
          <div className="w-80 mr-2 hidden xl:flex" />
        </div>
      </div>
    </MainLayout>
  );
};

export default ClipPage;
