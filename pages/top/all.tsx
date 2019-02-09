import Posts from '../../components/Posts';
import Streams from '../../components/Streams/Grid';
import Layout from '../../layouts/Main';

const TopAllPage = () => (
  <Layout>
    <Streams />
    <Posts title="Топ за все время" sort="topAll" />
  </Layout>
);

export default TopAllPage;
