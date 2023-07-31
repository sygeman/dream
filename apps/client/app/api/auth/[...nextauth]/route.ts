import NextAuth from 'next-auth';
import { authOptions } from 'apps/client/config/next-auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
