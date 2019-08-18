import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Clips } from '../';
import { ClipsHistoryGuest } from './Guest';

const GET_USER = gql`
  query getUser {
    user {
      id
    }
  }
`;

export const ClipsHistory = () => {
  const { loading, data } = useQuery(GET_USER, { ssr: false });

  const isUser = !!data.user;

  if (loading) {
    return <div></div>;
  }

  if (!isUser) {
    return <ClipsHistoryGuest />;
  }

  return (
    <Clips
      historyUserId={data.user.id}
      orderBy={{ name: 'clipHistoryUpdatedAt', type: 'DESC' }}
      title="История"
    />
  );
};
