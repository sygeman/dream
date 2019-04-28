import TwitchTopClips from '../components/TwitchTopClips';
import Layout from '../layouts/Main';

const FollowsPage = () => (
  <Layout>
    <TwitchTopClips limit={50} />
  </Layout>
);

export default FollowsPage;
