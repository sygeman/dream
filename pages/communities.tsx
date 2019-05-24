import Layout from '../layouts/Main';
import { Communities } from '../components/Community/Communities';
import CommunitiesProvider from '../providers/Communities';

const CommunitiesPage = () => {
  return (
    <Layout>
      <CommunitiesProvider>
        {({ communities }) => <Communities communities={communities} />}
      </CommunitiesProvider>
    </Layout>
  );
};

export default CommunitiesPage;
