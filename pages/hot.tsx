import Posts from '../components/Posts';
import Streams from '../components/Stream';
import Layout from '../layouts/Main';

const HotPage = () => (
  <Layout>
    <Streams />
    <Posts title="В тренде" sort={'hot'} />
  </Layout>
);

export default HotPage;
