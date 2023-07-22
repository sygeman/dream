import { DefaultSession } from 'next-auth';

export type SessionUser = {
  id: string;
  role?: string;
  image?: string;
} & DefaultSession['user'];
