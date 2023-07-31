import NextAuth, { DefaultSession } from 'next-auth';
import { type SessionUser } from './session-user';

declare module 'next-auth' {
  interface Session {
    user: SessionUser;
  }
}
