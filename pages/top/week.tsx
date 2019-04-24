import Posts from '../../components/Posts';
import Layout from '../../layouts/Main';

const TopWeekPage = () => (
  <Layout streams>
    <Posts title="Топ за неделю" sort="topWeek" />
  </Layout>
);

export default TopWeekPage;
