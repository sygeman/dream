import Posts from '../../components/Posts';
import Streams from '../../components/Streams/Grid';
import Layout from '../../layouts/Main';

const TopWeekPage = () => (
  <Layout>
    <Streams />
    <Posts title="Топ за неделю" sort="topWeek" />
  </Layout>
);

export default TopWeekPage;
