import subDays from 'date-fns/subDays';
import { Clips } from '@dream/pepega/containers-old';
import { MainLayout } from '@dream/pepega/layouts/main';

const TopMonthPage = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const startedAtMonth = new Date(subDays(now, 30)).toISOString();

  return (
    <MainLayout streams>
      <Clips
        title="Топ за месяц"
        description="Клипы за месяц с самым высоким рейтингом"
        titleLink="/top/month"
        startedAt={startedAtMonth}
        orderBy={{ name: 'clipRating', type: 'DESC' }}
      />
    </MainLayout>
  );
};

export default TopMonthPage;
