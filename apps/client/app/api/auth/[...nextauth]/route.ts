import NextAuth from 'next-auth';
import { authOptions } from 'apps/client/helpers/auth-options';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
