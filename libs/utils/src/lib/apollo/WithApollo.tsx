import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from './';

export const WithApollo: React.FC = ({ children }) => {
  const apolloClient = useApollo({
    uri: 'https://ravepro-api.sgmn.dev/graphql',
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
