import { Roboto, Orbitron } from 'next/font/google';

export const roboto = Roboto({
  weight: ['300', '400', '500'],
  subsets: ['cyrillic-ext'],
  display: 'swap',
});

export const orbitron = Orbitron({
  weight: ['500'],
  subsets: ['latin'],
  display: 'swap',
});
