import Posts from '../../components/Posts';
import Layout from '../../layouts/Main';

const TopDayPage = () => (
  <Layout streams>
    <Posts title="Топ за день" sort="topDay" />
  </Layout>
);

export default TopDayPage;
