import Posts from '../components/Posts';
import Streams from '../components/Streams/Grid';
import Layout from '../layouts/Main';

const HotPage = () => (
  <Layout>
    <Streams />
    <Posts title="В тренде" sort={'hot'} />
  </Layout>
);

export default HotPage;
