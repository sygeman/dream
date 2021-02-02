import { useMemo } from 'react';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
  NormalizedCacheObject,
} from '@apollo/client';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { authLink } from './authLink';
import { errorLink } from './errorLink';
import { getWsLink } from './wsLink';
import { getMainDefinition } from '@apollo/client/utilities';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient(uri: string) {
  const httpLink = createHttpLink({ uri });

  let link = errorLink.concat(authLink.concat(httpLink));

  if (typeof window !== 'undefined') {
    link = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      getWsLink(),
      link
    );
  }

  return new ApolloClient({
    link,
    ssrMode: false,
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null, uri: string) {
  const _apolloClient = apolloClient ?? createApolloClient(uri);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo({
  uri,
  pageProps,
}: {
  uri: string;
  pageProps?: any;
}) {
  const state = pageProps ? pageProps[APOLLO_STATE_PROP_NAME] : null;
  const store = useMemo(() => initializeApollo(state, uri), [state]);
  return store;
}
