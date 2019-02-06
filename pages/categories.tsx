import TwitchTopClips from '../components/TwitchTopClips';
import Layout from '../layouts/Main';

const CategoriesPage = () => (
  <Layout>
    <TwitchTopClips limit={50} />
  </Layout>
);

export default CategoriesPage;
