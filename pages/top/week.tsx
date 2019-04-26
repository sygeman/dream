import Posts from '../../components/Post/Posts';
import Layout from '../../layouts/Main';

const TopWeekPage = () => (
  <Layout streams>
    <Posts
      title="Топ за неделю"
      description="Клипы за неделю с самым высоким рейтингом"
      sort="topWeek"
    />
  </Layout>
);

export default TopWeekPage;
