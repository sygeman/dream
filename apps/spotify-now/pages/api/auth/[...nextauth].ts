import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../prisma';

export default NextAuth({
  secret: process.env.SESSION_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
      authorization: {
        params: { scope: 'user-read-playback-state' },
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
});
