import { useMeQuery } from './user.api';

export const useMe = () => {
  const userQuery = useMeQuery();
  return userQuery?.data?.me;
};
