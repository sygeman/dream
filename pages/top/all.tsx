import Posts from '../../components/Post/Posts';
import Layout from '../../layouts/Main';

const TopAllPage = () => (
  <Layout streams>
    <Posts
      title="Топ за все время"
      description="Клипы за все время с самым высоким рейтингом"
      sort="topAll"
    />
  </Layout>
);

export default TopAllPage;
