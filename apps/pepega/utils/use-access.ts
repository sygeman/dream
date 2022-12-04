import { useSession } from 'next-auth/react';

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
  role?: string;
}

export function useAccess(allow?: (currentUser: IUser) => boolean) {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  if (status !== 'authenticated') {
    return [{ loading, allow: false }];
  }

  if (typeof allow === 'function' && allow(session.user)) {
    return [{ loading, allow: true }];
  }

  if (typeof allow !== 'function' && !!session.user) {
    return [{ loading, allow: true }];
  }

  return [{ loading, allow: true }];
}
