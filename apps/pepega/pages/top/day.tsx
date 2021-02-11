import subDays from 'date-fns/subDays';
import { Clips } from '../containers/Clips';
import Layout from '../layouts/Main';

const TopDayPage = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const startedAtDay = new Date(subDays(now, 1)).toISOString();

  return (
    <Layout streams>
      <Clips
        title="Топ за день"
        description="Клипы за 24 часа с самым высоким рейтингом"
        titleLink="/top/day"
        startedAt={startedAtDay}
        orderBy={{ name: 'clipRating', type: 'DESC' }}
      />
    </Layout>
  );
};

export default TopDayPage;
