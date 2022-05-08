import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'resize-observer-polyfill';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../utils/apollo';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, themes } from '../themes';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function CustomApp({ Component, pageProps, locale }) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={themes.dark}>
        <>
          <Head>
            <title>PepegaCom</title>
          </Head>
          <Component {...pageProps} />
          <GlobalStyle />
        </>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default CustomApp;
