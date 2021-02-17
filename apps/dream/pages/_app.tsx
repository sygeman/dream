import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@dream/utils/apollo';
import '../styles/globals.css';
import 'simplebar/dist/simplebar.min.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <>
        <Head>
          <title>Dream</title>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css?family=Orbitron:500|Roboto:300,400,500&subset=cyrillic-ext"
            rel="stylesheet"
          />
        </Head>
        <Component {...pageProps} />
      </>
    </ApolloProvider>
  );
}

export default CustomApp;
