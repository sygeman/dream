import Posts from '../components/Posts';
import Streams from '../components/Streams/Grid';
import Layout from '../layouts/Main';

const NewPage = () => (
  <Layout>
    <Streams />
    <Posts title="Новое" sort={'new'} />
  </Layout>
);

export default NewPage;
