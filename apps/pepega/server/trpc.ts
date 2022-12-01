import { initTRPC, TRPCError } from '@trpc/server';
import { Context } from './context';

const t = initTRPC.context<Context>().create();
// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;

const isAuthed = middleware(({ next, ctx }) => {
  const user = ctx.session?.user;

  if (!user?.name) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      user: {
        ...user,
        name: user.name,
      },
    },
  });
});

/**
 * Protected base procedure
 */
export const authedProcedure = t.procedure.use(isAuthed);
