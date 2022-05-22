import subDays from 'date-fns/subDays';
import { Clips } from '@dream/pepega/containers-old';
import { MainLayout } from '@dream/pepega/layouts/main';

const IndexPage = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const startedAt = new Date(subDays(now, 1)).toISOString();

  return (
    <MainLayout streams>
      {/* <Clips
        orderBy={{ name: 'clipRating', type: 'DESC' }}
        ratingMin={1}
        startedAt={startedAt}
        title="Топ за день"
        description="Клипы за 24 часа с самым высоким рейтингом"
        titleLink="/top/day"
        rows={2}
      /> */}
      <Clips
        title="Новое"
        description="Самые последние предложенные клипы"
        titleLink="/new"
      />
    </MainLayout>
  );
};

export default IndexPage;
