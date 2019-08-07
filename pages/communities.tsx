import gql from 'graphql-tag';
import Layout from '../layouts/Main';
import { Communities } from '../components/Community/Communities';
import { useQuery } from 'react-apollo';

const GET_COMMUNITIES = gql`
  query communities {
    communities {
      id
      name
      description
      avatar
    }
  }
`;

const CommunitiesPage = () => {
  let communities = [];
  const { loading, error, data } = useQuery(GET_COMMUNITIES);

  if (!loading && !error && data && data.communities) {
    communities = data.communities;
  }

  return (
    <Layout streams>
      <Communities communities={communities} />
    </Layout>
  );
};

export default CommunitiesPage;
