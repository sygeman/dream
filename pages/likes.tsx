import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Posts from '../components/Posts';
import Streams from '../components/Stream';

const GET_USER = gql`
  query getUser {
    user {
      id
    }
  }
`;

const LikesPage = () => (
  <Query query={GET_USER}>
    {({ loading, error, data }) => {
      if (loading || error) {
        return null;
      }

      if (!data || !data.user) {
        return 'User not found';
      }

      const user = data.user;

      return (
        <>
          <Streams />
          <Posts title="Понравившиеся" likedUserId={user.id} />
        </>
      );
    }}
  </Query>
);

export default LikesPage;
