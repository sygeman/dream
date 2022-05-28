import React from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo';
import '../styles.css';

function CustomApp({ Component, pageProps }) {
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
