import { Clips } from '@dream/pepega/containers-old';
import { MainLayout } from '@dream/pepega/layouts/main';

const IndexPage = () => {
  return (
    <MainLayout>
      <Clips
        title="Топ клипы"
        description="Клипы с самым высоким рейтингом"
        titleLink="/top"
      />
    </MainLayout>
  );
};

export default IndexPage;
