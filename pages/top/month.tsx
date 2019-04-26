import Posts from '../../components/Post/Posts';
import Layout from '../../layouts/Main';

const TopMonthPage = () => (
  <Layout streams>
    <Posts
      title="Топ за месяц"
      description="Клипы за месяц с самым высоким рейтингом"
      sort="topMonth"
    />
  </Layout>
);

export default TopMonthPage;
