import subDays from 'date-fns/subDays';
import { Clips } from '@pepega/containers/Clips';
import Layout from '../layouts/Main';

const TopPage = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const startedAtDay = new Date(subDays(now, 1)).toISOString();
  const startedAtWeek = new Date(subDays(now, 14)).toISOString();
  const startedAtMonth = new Date(subDays(now, 30)).toISOString();

  return (
    <Layout streams>
      <Clips
        title="Топ за день"
        description="Клипы за 24 часа с самым высоким рейтингом"
        titleLink="/top/day"
        startedAt={startedAtDay}
        orderBy={{ name: 'clipRating', type: 'DESC' }}
        rows={1}
      />
      <Clips
        title="Топ за неделю"
        description="Клипы за неделю с самым высоким рейтингом"
        titleLink="/top/week"
        startedAt={startedAtWeek}
        orderBy={{ name: 'clipRating', type: 'DESC' }}
        rows={1}
      />
      <Clips
        title="Топ за месяц"
        description="Клипы за месяц с самым высоким рейтингом"
        titleLink="/top/month"
        startedAt={startedAtMonth}
        orderBy={{ name: 'clipRating', type: 'DESC' }}
        rows={1}
      />
      <Clips
        title="Топ за все время"
        description="Клипы за все время с самым высоким рейтингом"
        titleLink="/top/all"
        orderBy={{ name: 'clipRating', type: 'DESC' }}
        rows={1}
      />
    </Layout>
  );
};

export default TopPage;
