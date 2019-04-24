import Posts from '../../components/Posts';
import Layout from '../../layouts/Main';

const TopMonthPage = () => (
  <Layout streams>
    <Posts title="Топ за месяц" sort="topMonth" />
  </Layout>
);

export default TopMonthPage;
