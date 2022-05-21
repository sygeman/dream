import * as Types from '@dream/mono/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ChannelForCcQueryVariables = Types.Exact<{
  name: Types.Scalars['String'];
  communityId: Types.Scalars['String'];
}>;


export type ChannelForCcQuery = { __typename?: 'Query', channel: { __typename?: 'Channel', id: string, name: string, title: string, mode: Types.ChannelMode, gifAllowed: boolean, nsfw: boolean, slowmode: number, state?: string | null, avatar?: string | null, onlineCount: number } };

export type CommunityForCcQueryVariables = Types.Exact<{
  name: Types.Scalars['String'];
}>;


export type CommunityForCcQuery = { __typename?: 'Query', community: { __typename?: 'Community', id: string, name?: string | null, title: string, avatar?: string | null, onlineCount: number } };


export const ChannelForCcDocument = gql`
    query channelForCC($name: String!, $communityId: String!) {
  channel(name: $name, communityId: $communityId) {
    id
    name
    title
    mode
    gifAllowed
    nsfw
    slowmode
    state
    avatar
    onlineCount
  }
}
    `;

/**
 * __useChannelForCcQuery__
 *
 * To run a query within a React component, call `useChannelForCcQuery` and pass it any options that fit your needs.
 * When your component renders, `useChannelForCcQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelForCcQuery({
 *   variables: {
 *      name: // value for 'name'
 *      communityId: // value for 'communityId'
 *   },
 * });
 */
export function useChannelForCcQuery(baseOptions: Apollo.QueryHookOptions<ChannelForCcQuery, ChannelForCcQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChannelForCcQuery, ChannelForCcQueryVariables>(ChannelForCcDocument, options);
      }
export function useChannelForCcLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChannelForCcQuery, ChannelForCcQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChannelForCcQuery, ChannelForCcQueryVariables>(ChannelForCcDocument, options);
        }
export type ChannelForCcQueryHookResult = ReturnType<typeof useChannelForCcQuery>;
export type ChannelForCcLazyQueryHookResult = ReturnType<typeof useChannelForCcLazyQuery>;
export type ChannelForCcQueryResult = Apollo.QueryResult<ChannelForCcQuery, ChannelForCcQueryVariables>;
export const CommunityForCcDocument = gql`
    query communityForCC($name: String!) {
  community(name: $name) {
    id
    name
    title
    avatar
    onlineCount
  }
}
    `;

/**
 * __useCommunityForCcQuery__
 *
 * To run a query within a React component, call `useCommunityForCcQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityForCcQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityForCcQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCommunityForCcQuery(baseOptions: Apollo.QueryHookOptions<CommunityForCcQuery, CommunityForCcQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommunityForCcQuery, CommunityForCcQueryVariables>(CommunityForCcDocument, options);
      }
export function useCommunityForCcLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommunityForCcQuery, CommunityForCcQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommunityForCcQuery, CommunityForCcQueryVariables>(CommunityForCcDocument, options);
        }
export type CommunityForCcQueryHookResult = ReturnType<typeof useCommunityForCcQuery>;
export type CommunityForCcLazyQueryHookResult = ReturnType<typeof useCommunityForCcLazyQuery>;
export type CommunityForCcQueryResult = Apollo.QueryResult<CommunityForCcQuery, CommunityForCcQueryVariables>;