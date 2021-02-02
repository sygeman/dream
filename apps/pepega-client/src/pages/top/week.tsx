import subDays from 'date-fns/subDays';
import { Clips } from 'src/containers/Clips';
import Layout from 'src/layouts/Main';

const TopWeekPage = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const startedAtWeek = new Date(subDays(now, 14)).toISOString();

  return (
    <Layout streams>
      <Clips
        title="Топ за неделю"
        description="Клипы за неделю с самым высоким рейтингом"
        titleLink="/top/week"
        startedAt={startedAtWeek}
        orderBy={{ name: 'clipRating', type: 'DESC' }}
      />
    </Layout>
  );
};

export default TopWeekPage;
