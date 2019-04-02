import Posts from '../components/Posts';
import Streams from '../components/Streams/Grid';
import Layout from '../layouts/Main';

const IndexPage = () => (
  <Layout>
    <Streams />
    <Posts title="Топ за день" titleLink="/top/day" sort="topDay" rows={2} />
    <Posts title="Новое" titleLink="/new" sort="new" />
  </Layout>
);

export default IndexPage;
