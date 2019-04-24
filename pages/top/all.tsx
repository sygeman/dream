import Posts from '../../components/Posts';
import Layout from '../../layouts/Main';

const TopAllPage = () => (
  <Layout streams>
    <Posts title="Топ за все время" sort="topAll" />
  </Layout>
);

export default TopAllPage;
