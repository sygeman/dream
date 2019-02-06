import { createContext, useContext } from 'react';

export const RouterContext = createContext(null);

export default function useRouter() {
  return useContext(RouterContext);
}
