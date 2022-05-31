import { useMeQuery } from '../auth.api';
import { Guest } from './guest';
import { Skeleton } from './skeleton';
import { User } from './user';

export function NavProfile() {
  const meQuery = useMeQuery();
  const user = meQuery?.data?.me;

  if (meQuery?.loading) return <Skeleton />;
  if (!user) return <Guest />;

  return <User name={user?.name || ''} avatar={user?.avatar || ''} />;
}
