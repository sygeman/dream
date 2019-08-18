import subDays from 'date-fns/sub_days';
import { Clips } from '../components/Clips';
import Layout from '../layouts/Main';

const IndexPage = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const startedAt = new Date(subDays(now, 1)).toISOString();

  return (
    <Layout streams>
      <Clips
        orderBy={{ name: 'clipRating', type: 'DESC' }}
        ratingMin={1}
        startedAt={startedAt}
        title="Топ за день"
        description="Клипы за 24 часа с самым высоким рейтингом"
        titleLink="/top/day"
        rows={2}
      />
      <Clips
        title="Новое"
        description="Самые последние предложенные клипы"
        titleLink="/new"
      />
    </Layout>
  );
};

export default IndexPage;
