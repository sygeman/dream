import React from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@dream/apollo';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import '../styles.css';
import { StrictTypedTypePolicies } from '../utils/apollo-helpers';

const typePolicies: StrictTypedTypePolicies = {
  Query: {
    fields: {
      clips: {
        keyArgs: ['input', ['userId']],
        merge(existing, incoming, { readField }) {
          const clips = existing ? { ...existing.clips } : {};
          incoming.clips.forEach((clip) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            clips[readField('id', clip)] = clip;
          });
          return {
            cursor: incoming.cursor,
            clips,
          };
        },
        read(existing) {
          if (existing) {
            return {
              cursor: existing.cursor,
              clips: Object.values(existing.clips),
            };
          }
        },
      },
    },
  },
};

function CustomApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps, {
    apiUrl: process.env['NEXT_PUBLIC_PEPEGA_API'],
    inMemoryCacheConfig: { typePolicies },
  });

  return (
    <ApolloProvider client={apolloClient}>
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
    </ApolloProvider>
  );
}

export default CustomApp;
