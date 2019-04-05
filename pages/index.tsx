import Posts from '../components/Posts';
import Streams from '../components/Streams/Grid';
import Layout from '../layouts/Main';

const IndexPage = () => (
  <Layout>
    <Streams />
    <Posts
      title="Топ за день"
      description="Клипы за 24 часа с самым высоким рейтингом"
      titleLink="/top/day"
      sort="topDay"
      rows={2}
    />
    <Posts
      title="Новое"
      description="Самые последние предложенные клипы"
      titleLink="/new"
      sort="new"
    />
  </Layout>
);

export default IndexPage;
