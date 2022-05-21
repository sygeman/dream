import subDays from 'date-fns/subDays';
import { Clips } from '@dream/pepega/containers-old';
import { MainLayout } from '@dream/pepega/layouts/main';

const TopWeekPage = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const startedAtWeek = new Date(subDays(now, 14)).toISOString();

  return (
    <MainLayout streams>
      <Clips
        title="Топ за неделю"
        description="Клипы за неделю с самым высоким рейтингом"
        titleLink="/top/week"
        startedAt={startedAtWeek}
        orderBy={{ name: 'clipRating', type: 'DESC' }}
      />
    </MainLayout>
  );
};

export default TopWeekPage;
