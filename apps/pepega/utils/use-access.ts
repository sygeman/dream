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
  const loading = false;
  // const { loading, error, data } = useQuery(GET_USER, { ssr: false });

  // if (loading || error || !data.user) {
  //   return [{ loading, allow: false }];
  // }

  // if (typeof allow === 'function' && allow(data.user)) {
  //   return [{ loading, allow: true }];
  // }

  // if (typeof allow !== 'function' && !!data.user) {
  //   return [{ loading, allow: true }];
  // }

  return [{ loading, allow: false }];
}
