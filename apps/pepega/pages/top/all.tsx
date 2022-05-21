import { Clips } from '@dream/pepega/containers-old';
import { MainLayout } from '@dream/pepega/layouts/main';

const TopAllPage = () => (
  <MainLayout streams>
    <Clips
      title="Топ за все время"
      description="Клипы за все время с самым высоким рейтингом"
      titleLink="/top/all"
      orderBy={{ name: 'clipRating', type: 'DESC' }}
    />
  </MainLayout>
);

export default TopAllPage;
