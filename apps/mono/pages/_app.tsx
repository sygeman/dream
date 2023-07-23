import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { IntlProvider } from 'react-intl';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../libs/apollo';
import { lang } from '../lang';
import 'overlayscrollbars/overlayscrollbars.css';
import 'rc-slider/assets/index.css';
import '../styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps, {
    apiUrl: process.env['NEXT_PUBLIC_MONO_API'],
  });

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>Mono</title>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-16x16.png"
          sizes="16x16"
        />
      </Head>
      <IntlProvider locale="en-US" messages={lang['en-US']}>
        <Component {...pageProps} />
      </IntlProvider>
    </ApolloProvider>
  );
}

export default CustomApp;
