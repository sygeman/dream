import * as Types from '@dream/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ChannelQueryVariables = Types.Exact<{
  name: Types.Scalars['String'];
  communityId: Types.Scalars['String'];
}>;


export type ChannelQuery = { __typename?: 'Query', channel: { __typename?: 'Channel', id: string, name: string, title: string, mode: Types.ChannelMode, gifAllowed: boolean, nsfw: boolean, slowmode: number, state?: string | null, avatar?: string | null, onlineCount: number } };

export type CommunityQueryVariables = Types.Exact<{
  name: Types.Scalars['String'];
}>;


export type CommunityQuery = { __typename?: 'Query', community: { __typename?: 'Community', id: string, name?: string | null, title: string, avatar?: string | null, onlineCount: number } };

export type CommunityFieldsFragment = { __typename?: 'Community', id: string, name?: string | null, title: string, avatar?: string | null, onlineCount: number };

export type ChannelFieldsFragment = { __typename?: 'Channel', id: string, name: string, title: string, mode: Types.ChannelMode, gifAllowed: boolean, nsfw: boolean, slowmode: number, state?: string | null, avatar?: string | null, onlineCount: number };

export const CommunityFieldsFragmentDoc = gql`
    fragment CommunityFields on Community {
  id
  name
  title
  avatar
  onlineCount
}
    `;
export const ChannelFieldsFragmentDoc = gql`
    fragment ChannelFields on Channel {
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
    `;
export const ChannelDocument = gql`
    query channel($name: String!, $communityId: String!) {
  channel(name: $name, communityId: $communityId) {
    ...ChannelFields
  }
}
    ${ChannelFieldsFragmentDoc}`;

/**
 * __useChannelQuery__
 *
 * To run a query within a React component, call `useChannelQuery` and pass it any options that fit your needs.
 * When your component renders, `useChannelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelQuery({
 *   variables: {
 *      name: // value for 'name'
 *      communityId: // value for 'communityId'
 *   },
 * });
 */
export function useChannelQuery(baseOptions: Apollo.QueryHookOptions<ChannelQuery, ChannelQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChannelQuery, ChannelQueryVariables>(ChannelDocument, options);
      }
export function useChannelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChannelQuery, ChannelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChannelQuery, ChannelQueryVariables>(ChannelDocument, options);
        }
export type ChannelQueryHookResult = ReturnType<typeof useChannelQuery>;
export type ChannelLazyQueryHookResult = ReturnType<typeof useChannelLazyQuery>;
export type ChannelQueryResult = Apollo.QueryResult<ChannelQuery, ChannelQueryVariables>;
export const CommunityDocument = gql`
    query community($name: String!) {
  community(name: $name) {
    ...CommunityFields
  }
}
    ${CommunityFieldsFragmentDoc}`;

/**
 * __useCommunityQuery__
 *
 * To run a query within a React component, call `useCommunityQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCommunityQuery(baseOptions: Apollo.QueryHookOptions<CommunityQuery, CommunityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommunityQuery, CommunityQueryVariables>(CommunityDocument, options);
      }
export function useCommunityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommunityQuery, CommunityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommunityQuery, CommunityQueryVariables>(CommunityDocument, options);
        }
export type CommunityQueryHookResult = ReturnType<typeof useCommunityQuery>;
export type CommunityLazyQueryHookResult = ReturnType<typeof useCommunityLazyQuery>;
export type CommunityQueryResult = Apollo.QueryResult<CommunityQuery, CommunityQueryVariables>;