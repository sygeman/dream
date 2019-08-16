import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Clips } from '../components/Clip/Clips';
import Layout from '../layouts/Main';

const GET_USER = gql`
  query getUser {
    user {
      id
    }
  }
`;

const LikesPage = () => {
  const { loading, data } = useQuery(GET_USER, { ssr: false });

  return (
    <Layout>
      {loading ? (
        ''
      ) : (
        <Clips
          likedUserId={data.user.id}
          orderBy={{ name: 'clipReactionUpdatedAt', type: 'DESC' }}
          title="Понравившиеся"
        />
      )}
    </Layout>
  );
};

export default LikesPage;
