import { Roboto } from '@next/font/google';
import '../styles/global.css';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={roboto.className}>
      <head />
      <body>{children}</body>
    </html>
  );
}
