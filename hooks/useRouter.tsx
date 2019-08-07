import { createContext, useContext } from 'react';

export const RouterContext = createContext(null);

export function useRouter() {
  return useContext(RouterContext);
}
