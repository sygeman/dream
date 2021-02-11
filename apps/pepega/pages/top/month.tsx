import subDays from 'date-fns/subDays';
import { Clips } from '../containers/Clips';
import Layout from '../layouts/Main';

const TopMonthPage = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const startedAtMonth = new Date(subDays(now, 30)).toISOString();

  return (
    <Layout streams>
      <Clips
        title="Топ за месяц"
        description="Клипы за месяц с самым высоким рейтингом"
        titleLink="/top/month"
        startedAt={startedAtMonth}
        orderBy={{ name: 'clipRating', type: 'DESC' }}
      />
    </Layout>
  );
};

export default TopMonthPage;
