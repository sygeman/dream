import Posts from '../components/Posts';
import Layout from '../layouts/Main';

const TopPage = () => (
  <Layout streams>
    <Posts
      title="Топ за день"
      description="Клипы за 24 часа с самым высоким рейтингом"
      titleLink="/top/day"
      sort="topDay"
      rows={1}
    />
    <Posts
      title="Топ за неделю"
      description="Клипы за неделю с самым высоким рейтингом"
      titleLink="/top/week"
      sort="topWeek"
      rows={1}
    />
    <Posts
      title="Топ за месяц"
      description="Клипы за месяц с самым высоким рейтингом"
      titleLink="/top/month"
      sort="topMonth"
      rows={1}
    />
    <Posts
      title="Топ за все время"
      description="Клипы за все время с самым высоким рейтингом"
      titleLink="/top/all"
      sort="topAll"
      rows={1}
    />
  </Layout>
);

export default TopPage;
