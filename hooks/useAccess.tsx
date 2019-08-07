import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';

const GET_USER = gql`
  query getUser {
    user {
      id
      role
    }
  }
`;

interface IProfile {
  id: string;
  name: string;
  avatar: string;
  serviceName: string;
  serviceId: string;
  visible: boolean;
}

interface IUser {
  id: string;
  role: string;
  profiles: IProfile[];
}

export function useAccess(allow?: (currentUser: IUser) => boolean) {
  const { loading, error, data } = useQuery(GET_USER, { ssr: false });

  if (loading || error || !data.user) {
    return false;
  }

  if (typeof allow === 'function' && allow(data.user)) {
    return true;
  }

  if (typeof allow !== 'function' && !!data.user) {
    return true;
  }

  return false;
}
