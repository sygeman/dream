import Posts from '../components/Posts';
import Streams from '../components/Stream';
import Layout from '../layouts/Main';

const IndexPage = () => (
  <Layout>
    <Streams />
    <Posts title="Топ за день" titleLink="/top/day" sort="topDay" rows={1} />
    <Posts title="В тренде" titleLink="/hot" sort="hot" rows={1} />
    <Posts title="Новое" titleLink="/new" sort="new" />
  </Layout>
);

export default IndexPage;
