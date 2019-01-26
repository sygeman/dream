import Posts from '../../components/Posts';
import Streams from '../../components/Stream';
import Layout from '../../layouts/Main';

const TopWeekPage = () => (
  <Layout>
    <Streams />
    <Posts title="Топ за неделю" sort="topWeek" />
  </Layout>
);

export default TopWeekPage;
