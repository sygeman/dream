import { useQuery } from '@apollo/client';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid';
import gql from 'graphql-tag';
import { signOut } from 'next-auth/react';
import { Avatar } from '../../components/avatar';

const GET_USER = gql`
  query getUser($id: ID) {
    user(id: $id) {
      id
      name
      avatar
    }
  }
`;

export const User = () => {
  const { loading, error, data } = useQuery(GET_USER, { ssr: false });

  if (loading || error) return null;

  const user = data.user;

  return (
    <div className="h-10 flex items-center bg-surface/50">
      <div className="px-4">
        <Avatar avatar={user.avatar} />
      </div>
      <div className="flex flex-1 items-center text-white/75 font-medium text-sm">
        {user.name}
      </div>
      <button
        className="hover:bg-background/50 p-2 mx-2 rounded-lg"
        onClick={() => signOut()}
      >
        <ArrowRightOnRectangleIcon className="h-4" />
      </button>
    </div>
  );
};
