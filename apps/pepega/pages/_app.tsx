import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'resize-observer-polyfill';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo';
import '../styles.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function CustomApp({ Component, pageProps, locale }) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>PepegaCom</title>
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:type" content="website" />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default CustomApp;
