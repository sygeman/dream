import Layout from '../layouts/Main';
import { Clips } from '../components/Clips';

const NewPage = () => (
  <Layout streams>
    <Clips title="Новое" description="Самые последние предложенные клипы" />
  </Layout>
);

export default NewPage;
