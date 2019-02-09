import Posts from '../../components/Posts';
import Streams from '../../components/Streams/Grid';
import Layout from '../../layouts/Main';

const TopDayPage = () => (
  <Layout>
    <Streams />
    <Posts title="Топ за день" sort="topDay" />
  </Layout>
);

export default TopDayPage;
