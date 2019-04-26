import Posts from '../../components/Post/Posts';
import Layout from '../../layouts/Main';

const TopDayPage = () => (
  <Layout streams>
    <Posts
      title="Топ за день"
      description="Клипы за 24 часа с самым высоким рейтингом"
      sort="topDay"
    />
  </Layout>
);

export default TopDayPage;
