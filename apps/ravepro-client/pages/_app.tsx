import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@pepega/utils/apollo';

function CustomApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo({
    uri: 'https://ravepro-api.sgmn.dev/graphql',
    pageProps,
  });

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        <title>RavePro</title>
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default CustomApp;
