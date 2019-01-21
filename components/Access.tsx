import gql from 'graphql-tag';
import { FC, ReactNode } from 'react';
import { Query } from 'react-apollo';

const GET_USER = gql`
  query getUser {
    user {
      id
      role
      profiles {
        id
        name
        avatar
        serviceName
        serviceId
        visible
      }
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
  denyContent?: ReactNode;
}

const Access: FC<IProps> = ({ allow, children, denyContent }) => (
  <Query query={GET_USER}>
    {({ loading, error, data }) => {
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
    }}
  </Query>
);

export default Access;
