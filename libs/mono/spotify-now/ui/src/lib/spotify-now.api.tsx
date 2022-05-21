import * as Types from '@dream/mono/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SpotifyNowQueryVariables = Types.Exact<{
  userId: Types.Scalars['String'];
}>;


export type SpotifyNowQuery = { __typename?: 'Query', spotifyNow?: { __typename?: 'SpotifyNow', id: string, imageUrl: string, artist: string, name: string, progress: number } | null };


export const SpotifyNowDocument = gql`
    query spotifyNow($userId: String!) {
  spotifyNow(userId: $userId) {
    id
    imageUrl
    artist
    name
    progress
  }
}
    `;

/**
 * __useSpotifyNowQuery__
 *
 * To run a query within a React component, call `useSpotifyNowQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpotifyNowQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpotifyNowQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useSpotifyNowQuery(baseOptions: Apollo.QueryHookOptions<SpotifyNowQuery, SpotifyNowQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SpotifyNowQuery, SpotifyNowQueryVariables>(SpotifyNowDocument, options);
      }
export function useSpotifyNowLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SpotifyNowQuery, SpotifyNowQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SpotifyNowQuery, SpotifyNowQueryVariables>(SpotifyNowDocument, options);
        }
export type SpotifyNowQueryHookResult = ReturnType<typeof useSpotifyNowQuery>;
export type SpotifyNowLazyQueryHookResult = ReturnType<typeof useSpotifyNowLazyQuery>;
export type SpotifyNowQueryResult = Apollo.QueryResult<SpotifyNowQuery, SpotifyNowQueryVariables>;