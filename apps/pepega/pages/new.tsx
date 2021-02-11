import Layout from 'src/layouts/Main';
import { Clips } from 'src/containers/Clips';

const NewPage = () => (
  <Layout streams>
    <Clips title="Новое" description="Самые последние предложенные клипы" />
  </Layout>
);

export default NewPage;
