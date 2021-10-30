import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
      //   scope: [
      //     'user-read-email user-read-playback-state user-modify-playback-state',
      //     'user-read-playback-state',
      //     'user-modify-playback-state',
      //   ],
    }),
  ],
});
