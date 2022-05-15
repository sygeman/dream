import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'resize-observer-polyfill';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../utils/apollo';
import { ThemeProvider } from 'styled-components';
import '../styles.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function CustomApp({ Component, pageProps, locale }) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider
        theme={{
          colors: {
            primary: '#6441A4',
            surface: '#262841',
            background: '#1D1E31',
            accent: '#968A9D',
            text: '#EEEEEE',
          },
        }}
      >
        <>
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
        </>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default CustomApp;
