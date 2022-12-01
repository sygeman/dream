import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { getSession } from 'next-auth/react';

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async (
  opts: trpcNext.CreateNextContextOptions
) => {
  const session = await getSession(opts);
  return { session };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
