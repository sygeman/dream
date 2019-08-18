import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Clips } from '../';
import { ClipsLikesGuest } from './Guest';

const GET_USER = gql`
  query getUser {
    user {
      id
    }
  }
`;

export const ClipsLikes = () => {
  const { loading, data } = useQuery(GET_USER, { ssr: false });

  const isUser = !!data.user;

  if (loading) {
    return <div></div>;
  }

  if (!isUser) {
    return <ClipsLikesGuest />;
  }

  return (
    <Clips
      likedUserId={data.user.id}
      orderBy={{ name: 'clipReactionUpdatedAt', type: 'DESC' }}
      title="Понравившиеся"
    />
  );
};
