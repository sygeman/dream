import gql from 'graphql-tag';
import { FC } from 'react';
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

interface IProps {
  name?: string;
  allow?: (currentUser: IUser) => boolean;
  denyContent?: any;
}

export const Access: FC<IProps> = ({ allow, children, denyContent }) => {
  const { loading, error, data } = useQuery(GET_USER, { ssr: false });

  if (loading) {
    return null;
  }

  if (error) {
    if (denyContent) {
      return denyContent;
    }

    return null;
  }

  if (!data.user) {
    return denyContent || null;
  }

  if (typeof allow === 'function' && allow(data.user)) {
    return children;
  }

  if (typeof allow !== 'function' && !!data.user) {
    return children;
  }

  if (denyContent) {
    return denyContent;
  }

  return null;
};
