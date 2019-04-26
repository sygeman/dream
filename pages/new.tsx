import Posts from '../components/Post/Posts';
import Layout from '../layouts/Main';

const NewPage = () => (
  <Layout streams>
    <Posts title="Новое" sort={'new'} />
  </Layout>
);

export default NewPage;
