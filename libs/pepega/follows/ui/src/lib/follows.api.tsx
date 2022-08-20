import * as Types from '@dream/pepega/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FollowsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FollowsQuery = { __typename?: 'Query', follows: Array<{ __typename?: 'TwitchChannel', id: string, login: string, display_name: string, profile_image_url: string }> };


export const FollowsDocument = gql`
    query follows {
  follows {
    id
    login
    display_name
    profile_image_url
  }
}
    `;

/**
 * __useFollowsQuery__
 *
 * To run a query within a React component, call `useFollowsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFollowsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFollowsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFollowsQuery(baseOptions?: Apollo.QueryHookOptions<FollowsQuery, FollowsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FollowsQuery, FollowsQueryVariables>(FollowsDocument, options);
      }
export function useFollowsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FollowsQuery, FollowsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FollowsQuery, FollowsQueryVariables>(FollowsDocument, options);
        }
export type FollowsQueryHookResult = ReturnType<typeof useFollowsQuery>;
export type FollowsLazyQueryHookResult = ReturnType<typeof useFollowsLazyQuery>;
export type FollowsQueryResult = Apollo.QueryResult<FollowsQuery, FollowsQueryVariables>;