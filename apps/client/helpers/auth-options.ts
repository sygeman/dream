import type { NextAuthOptions } from 'next-auth';
import TwitchProvider from 'next-auth/providers/twitch';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../libs/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_ID || '',
      clientSecret: process.env.TWITCH_SECRET || '',
      authorization: {
        params: {
          scope: 'openid user:read:email user:read:follows',
        },
      },
    }),
    // clientID: process.env.SPOTIFY_ID,
    // clientSecret: process.env.SPOTIFY_SECRET,
    // callbackURL: `${process.env.NEXT_PUBLIC_MONO_API}authend/spotify`,
    // scope: [
    //   'user-read-email',
    //   'user-read-playback-state',
    //   'user-modify-playback-state',
    // ],
  ],
  callbacks: {
    async session({ session, user }) {
      const u = await prisma.user.findUnique({
        where: { id: user.id },
        select: { role: true, image: true },
      });
      session.user.id = user.id;
      session.user.role = u?.role as string;
      session.user.image = u?.image as string;
      return session;
    },
    async redirect({ url }) {
      return url.replace('authModal=1', '').replace('logout=1', '');
    },
  },
};
