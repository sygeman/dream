import Posts from '../../components/Posts';
import Streams from '../../components/Stream';
import Layout from '../../layouts/Main';

const TopMonthPage = () => (
  <Layout>
    <Streams />
    <Posts title="Топ за месяц" sort="topMonth" />
  </Layout>
);

export default TopMonthPage;
