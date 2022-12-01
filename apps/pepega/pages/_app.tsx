import React from 'react';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import type { AppType } from 'next/app';
import type { Session } from 'next-auth';
import { trpc } from '../utils/trpc';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import '../styles.css';

const CustomApp: AppType<{ session: Session }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <SessionProvider session={session} refetchInterval={5 * 60}>
    <Head>
      <title>Pepega.Com</title>
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:type" content="website" />
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width"
        key="viewport"
      />
    </Head>
    <Component {...pageProps} />
  </SessionProvider>
);

export default trpc.withTRPC(CustomApp);
