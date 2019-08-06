import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import Posts from '../components/Post/Posts';
import Layout from '../layouts/Main';

const GET_USER = gql`
  query getUser {
    user {
      id
    }
  }
`;

const LikesPage = () => {
  const { loading, data } = useQuery(GET_USER);

  return (
    <Layout>
      {loading ? (
        'Loading'
      ) : (
        <Posts title="Понравившиеся" likedUserId={data.user.id} />
      )}
    </Layout>
  );
};

export default LikesPage;
