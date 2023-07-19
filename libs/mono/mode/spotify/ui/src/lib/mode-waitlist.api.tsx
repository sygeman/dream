import * as Types from '@dream/mono-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SpotifyModeQueryVariables = Types.Exact<{
  channelId: Types.Scalars['String']['input'];
}>;


export type SpotifyModeQuery = { __typename?: 'Query', spotifyMode: { __typename?: 'SpotifyMode', id: string, hostId?: string | null, strategy: Types.SpotifyModeStrategy } };

export type SpotifyModeHistoryQueryVariables = Types.Exact<{
  channelId: Types.Scalars['String']['input'];
}>;


export type SpotifyModeHistoryQuery = { __typename?: 'Query', spotifyModeHistory: { __typename?: 'SpotifyModeHistory', items: Array<{ __typename?: 'SpotifyModeHistoryItem', actions: Array<Types.SpotifyModeHistoryItemAction>, data: { __typename?: 'SpotifyModeHistoryItemData', id: string, trackId: string, duration: number, cover: string, artists: string, title: string, startedAt?: string | null, endedAt?: string | null, author: { __typename?: 'SpotifyModeHistoryItemDataAuthor', id: string, name: string, avatar?: string | null } } }> } };

export type SpotifyModeCurrentQueryVariables = Types.Exact<{
  channelId: Types.Scalars['String']['input'];
}>;


export type SpotifyModeCurrentQuery = { __typename?: 'Query', spotifyModeCurrent?: { __typename?: 'SpotifyModeCurrent', actions: Array<Types.SpotifyModeCurrentAction>, item?: { __typename?: 'SpotifyModeCurrentItem', id: string, trackId: string, duration: number, cover: string, artists: string, title: string, start: number, end: number, startedAt?: string | null, author: { __typename?: 'SpotifyModeCurrentItemAuthor', id: string, name: string, avatar?: string | null } } | null } | null };

export type SpotifyModeQueueQueryVariables = Types.Exact<{
  channelId: Types.Scalars['String']['input'];
}>;


export type SpotifyModeQueueQuery = { __typename?: 'Query', spotifyModeQueue: { __typename?: 'SpotifyModeQueue', actions: Array<Types.SpotifyModeQueueAction>, items: Array<{ __typename?: 'SpotifyModeQueueItem', actions: Array<Types.SpotifyModeQueueItemAction>, data: { __typename?: 'SpotifyModeQueueItemData', id: string, trackId: string, duration: number, cover: string, artists: string, title: string, author: { __typename?: 'SpotifyModeQueueItemDataAuthor', id: string, name: string, avatar?: string | null } } }> } };

export type UpdateSpotifyModeMutationVariables = Types.Exact<{
  input: Types.UpdateSpotifyModeInput;
}>;


export type UpdateSpotifyModeMutation = { __typename?: 'Mutation', updateSpotifyMode: { __typename?: 'SpotifyMode', id: string, hostId?: string | null, strategy: Types.SpotifyModeStrategy } };

export type SpotifyModeQueueAddTrackMutationVariables = Types.Exact<{
  channelId: Types.Scalars['String']['input'];
  trackId: Types.Scalars['String']['input'];
}>;


export type SpotifyModeQueueAddTrackMutation = { __typename?: 'Mutation', spotifyModeQueueAddTrack: boolean };

export type SpotifyModeQueueSkipTrackMutationVariables = Types.Exact<{
  channelId: Types.Scalars['String']['input'];
}>;


export type SpotifyModeQueueSkipTrackMutation = { __typename?: 'Mutation', spotifyModeQueueSkipTrack: boolean };

export type SpotifyModeUserSyncMutationVariables = Types.Exact<{
  channelId: Types.Scalars['String']['input'];
}>;


export type SpotifyModeUserSyncMutation = { __typename?: 'Mutation', spotifyModeUserSync: boolean };

export type SpotifyModeCurrentUpdatedSubscriptionVariables = Types.Exact<{
  channelId: Types.Scalars['String']['input'];
}>;


export type SpotifyModeCurrentUpdatedSubscription = { __typename?: 'Subscription', spotifyModeCurrentUpdated: boolean };

export type SpotifyModeQueueUpdatedSubscriptionVariables = Types.Exact<{
  channelId: Types.Scalars['String']['input'];
}>;


export type SpotifyModeQueueUpdatedSubscription = { __typename?: 'Subscription', spotifyModeQueueUpdated: boolean };

export type SpotifyModeHistoryUpdatedSubscriptionVariables = Types.Exact<{
  channelId: Types.Scalars['String']['input'];
}>;


export type SpotifyModeHistoryUpdatedSubscription = { __typename?: 'Subscription', spotifyModeHistoryUpdated: boolean };

export type SpotifyModeFieldsFragment = { __typename?: 'SpotifyMode', id: string, hostId?: string | null, strategy: Types.SpotifyModeStrategy };

export const SpotifyModeFieldsFragmentDoc = gql`
    fragment SpotifyModeFields on SpotifyMode {
  id
  hostId
  strategy
}
    `;
export const SpotifyModeDocument = gql`
    query spotifyMode($channelId: String!) {
  spotifyMode(channelId: $channelId) {
    ...SpotifyModeFields
  }
}
    ${SpotifyModeFieldsFragmentDoc}`;

/**
 * __useSpotifyModeQuery__
 *
 * To run a query within a React component, call `useSpotifyModeQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpotifyModeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpotifyModeQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useSpotifyModeQuery(baseOptions: Apollo.QueryHookOptions<SpotifyModeQuery, SpotifyModeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SpotifyModeQuery, SpotifyModeQueryVariables>(SpotifyModeDocument, options);
      }
export function useSpotifyModeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SpotifyModeQuery, SpotifyModeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SpotifyModeQuery, SpotifyModeQueryVariables>(SpotifyModeDocument, options);
        }
export type SpotifyModeQueryHookResult = ReturnType<typeof useSpotifyModeQuery>;
export type SpotifyModeLazyQueryHookResult = ReturnType<typeof useSpotifyModeLazyQuery>;
export type SpotifyModeQueryResult = Apollo.QueryResult<SpotifyModeQuery, SpotifyModeQueryVariables>;
export const SpotifyModeHistoryDocument = gql`
    query spotifyModeHistory($channelId: String!) {
  spotifyModeHistory(channelId: $channelId) {
    items {
      data {
        id
        trackId
        duration
        cover
        artists
        title
        startedAt
        endedAt
        author {
          id
          name
          avatar
        }
      }
      actions
    }
  }
}
    `;

/**
 * __useSpotifyModeHistoryQuery__
 *
 * To run a query within a React component, call `useSpotifyModeHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpotifyModeHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpotifyModeHistoryQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useSpotifyModeHistoryQuery(baseOptions: Apollo.QueryHookOptions<SpotifyModeHistoryQuery, SpotifyModeHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SpotifyModeHistoryQuery, SpotifyModeHistoryQueryVariables>(SpotifyModeHistoryDocument, options);
      }
export function useSpotifyModeHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SpotifyModeHistoryQuery, SpotifyModeHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SpotifyModeHistoryQuery, SpotifyModeHistoryQueryVariables>(SpotifyModeHistoryDocument, options);
        }
export type SpotifyModeHistoryQueryHookResult = ReturnType<typeof useSpotifyModeHistoryQuery>;
export type SpotifyModeHistoryLazyQueryHookResult = ReturnType<typeof useSpotifyModeHistoryLazyQuery>;
export type SpotifyModeHistoryQueryResult = Apollo.QueryResult<SpotifyModeHistoryQuery, SpotifyModeHistoryQueryVariables>;
export const SpotifyModeCurrentDocument = gql`
    query spotifyModeCurrent($channelId: String!) {
  spotifyModeCurrent(channelId: $channelId) {
    item {
      id
      trackId
      duration
      cover
      artists
      title
      start
      end
      startedAt
      author {
        id
        name
        avatar
      }
    }
    actions
  }
}
    `;

/**
 * __useSpotifyModeCurrentQuery__
 *
 * To run a query within a React component, call `useSpotifyModeCurrentQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpotifyModeCurrentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpotifyModeCurrentQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useSpotifyModeCurrentQuery(baseOptions: Apollo.QueryHookOptions<SpotifyModeCurrentQuery, SpotifyModeCurrentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SpotifyModeCurrentQuery, SpotifyModeCurrentQueryVariables>(SpotifyModeCurrentDocument, options);
      }
export function useSpotifyModeCurrentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SpotifyModeCurrentQuery, SpotifyModeCurrentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SpotifyModeCurrentQuery, SpotifyModeCurrentQueryVariables>(SpotifyModeCurrentDocument, options);
        }
export type SpotifyModeCurrentQueryHookResult = ReturnType<typeof useSpotifyModeCurrentQuery>;
export type SpotifyModeCurrentLazyQueryHookResult = ReturnType<typeof useSpotifyModeCurrentLazyQuery>;
export type SpotifyModeCurrentQueryResult = Apollo.QueryResult<SpotifyModeCurrentQuery, SpotifyModeCurrentQueryVariables>;
export const SpotifyModeQueueDocument = gql`
    query spotifyModeQueue($channelId: String!) {
  spotifyModeQueue(channelId: $channelId) {
    items {
      data {
        id
        trackId
        duration
        cover
        artists
        title
        author {
          id
          name
          avatar
        }
      }
      actions
    }
    actions
  }
}
    `;

/**
 * __useSpotifyModeQueueQuery__
 *
 * To run a query within a React component, call `useSpotifyModeQueueQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpotifyModeQueueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpotifyModeQueueQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useSpotifyModeQueueQuery(baseOptions: Apollo.QueryHookOptions<SpotifyModeQueueQuery, SpotifyModeQueueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SpotifyModeQueueQuery, SpotifyModeQueueQueryVariables>(SpotifyModeQueueDocument, options);
      }
export function useSpotifyModeQueueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SpotifyModeQueueQuery, SpotifyModeQueueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SpotifyModeQueueQuery, SpotifyModeQueueQueryVariables>(SpotifyModeQueueDocument, options);
        }
export type SpotifyModeQueueQueryHookResult = ReturnType<typeof useSpotifyModeQueueQuery>;
export type SpotifyModeQueueLazyQueryHookResult = ReturnType<typeof useSpotifyModeQueueLazyQuery>;
export type SpotifyModeQueueQueryResult = Apollo.QueryResult<SpotifyModeQueueQuery, SpotifyModeQueueQueryVariables>;
export const UpdateSpotifyModeDocument = gql`
    mutation updateSpotifyMode($input: UpdateSpotifyModeInput!) {
  updateSpotifyMode(input: $input) {
    ...SpotifyModeFields
  }
}
    ${SpotifyModeFieldsFragmentDoc}`;
export type UpdateSpotifyModeMutationFn = Apollo.MutationFunction<UpdateSpotifyModeMutation, UpdateSpotifyModeMutationVariables>;

/**
 * __useUpdateSpotifyModeMutation__
 *
 * To run a mutation, you first call `useUpdateSpotifyModeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSpotifyModeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSpotifyModeMutation, { data, loading, error }] = useUpdateSpotifyModeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSpotifyModeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSpotifyModeMutation, UpdateSpotifyModeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSpotifyModeMutation, UpdateSpotifyModeMutationVariables>(UpdateSpotifyModeDocument, options);
      }
export type UpdateSpotifyModeMutationHookResult = ReturnType<typeof useUpdateSpotifyModeMutation>;
export type UpdateSpotifyModeMutationResult = Apollo.MutationResult<UpdateSpotifyModeMutation>;
export type UpdateSpotifyModeMutationOptions = Apollo.BaseMutationOptions<UpdateSpotifyModeMutation, UpdateSpotifyModeMutationVariables>;
export const SpotifyModeQueueAddTrackDocument = gql`
    mutation spotifyModeQueueAddTrack($channelId: String!, $trackId: String!) {
  spotifyModeQueueAddTrack(channelId: $channelId, trackId: $trackId)
}
    `;
export type SpotifyModeQueueAddTrackMutationFn = Apollo.MutationFunction<SpotifyModeQueueAddTrackMutation, SpotifyModeQueueAddTrackMutationVariables>;

/**
 * __useSpotifyModeQueueAddTrackMutation__
 *
 * To run a mutation, you first call `useSpotifyModeQueueAddTrackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSpotifyModeQueueAddTrackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [spotifyModeQueueAddTrackMutation, { data, loading, error }] = useSpotifyModeQueueAddTrackMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      trackId: // value for 'trackId'
 *   },
 * });
 */
export function useSpotifyModeQueueAddTrackMutation(baseOptions?: Apollo.MutationHookOptions<SpotifyModeQueueAddTrackMutation, SpotifyModeQueueAddTrackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SpotifyModeQueueAddTrackMutation, SpotifyModeQueueAddTrackMutationVariables>(SpotifyModeQueueAddTrackDocument, options);
      }
export type SpotifyModeQueueAddTrackMutationHookResult = ReturnType<typeof useSpotifyModeQueueAddTrackMutation>;
export type SpotifyModeQueueAddTrackMutationResult = Apollo.MutationResult<SpotifyModeQueueAddTrackMutation>;
export type SpotifyModeQueueAddTrackMutationOptions = Apollo.BaseMutationOptions<SpotifyModeQueueAddTrackMutation, SpotifyModeQueueAddTrackMutationVariables>;
export const SpotifyModeQueueSkipTrackDocument = gql`
    mutation spotifyModeQueueSkipTrack($channelId: String!) {
  spotifyModeQueueSkipTrack(channelId: $channelId)
}
    `;
export type SpotifyModeQueueSkipTrackMutationFn = Apollo.MutationFunction<SpotifyModeQueueSkipTrackMutation, SpotifyModeQueueSkipTrackMutationVariables>;

/**
 * __useSpotifyModeQueueSkipTrackMutation__
 *
 * To run a mutation, you first call `useSpotifyModeQueueSkipTrackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSpotifyModeQueueSkipTrackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [spotifyModeQueueSkipTrackMutation, { data, loading, error }] = useSpotifyModeQueueSkipTrackMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useSpotifyModeQueueSkipTrackMutation(baseOptions?: Apollo.MutationHookOptions<SpotifyModeQueueSkipTrackMutation, SpotifyModeQueueSkipTrackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SpotifyModeQueueSkipTrackMutation, SpotifyModeQueueSkipTrackMutationVariables>(SpotifyModeQueueSkipTrackDocument, options);
      }
export type SpotifyModeQueueSkipTrackMutationHookResult = ReturnType<typeof useSpotifyModeQueueSkipTrackMutation>;
export type SpotifyModeQueueSkipTrackMutationResult = Apollo.MutationResult<SpotifyModeQueueSkipTrackMutation>;
export type SpotifyModeQueueSkipTrackMutationOptions = Apollo.BaseMutationOptions<SpotifyModeQueueSkipTrackMutation, SpotifyModeQueueSkipTrackMutationVariables>;
export const SpotifyModeUserSyncDocument = gql`
    mutation spotifyModeUserSync($channelId: String!) {
  spotifyModeUserSync(channelId: $channelId)
}
    `;
export type SpotifyModeUserSyncMutationFn = Apollo.MutationFunction<SpotifyModeUserSyncMutation, SpotifyModeUserSyncMutationVariables>;

/**
 * __useSpotifyModeUserSyncMutation__
 *
 * To run a mutation, you first call `useSpotifyModeUserSyncMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSpotifyModeUserSyncMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [spotifyModeUserSyncMutation, { data, loading, error }] = useSpotifyModeUserSyncMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useSpotifyModeUserSyncMutation(baseOptions?: Apollo.MutationHookOptions<SpotifyModeUserSyncMutation, SpotifyModeUserSyncMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SpotifyModeUserSyncMutation, SpotifyModeUserSyncMutationVariables>(SpotifyModeUserSyncDocument, options);
      }
export type SpotifyModeUserSyncMutationHookResult = ReturnType<typeof useSpotifyModeUserSyncMutation>;
export type SpotifyModeUserSyncMutationResult = Apollo.MutationResult<SpotifyModeUserSyncMutation>;
export type SpotifyModeUserSyncMutationOptions = Apollo.BaseMutationOptions<SpotifyModeUserSyncMutation, SpotifyModeUserSyncMutationVariables>;
export const SpotifyModeCurrentUpdatedDocument = gql`
    subscription spotifyModeCurrentUpdated($channelId: String!) {
  spotifyModeCurrentUpdated(channelId: $channelId)
}
    `;

/**
 * __useSpotifyModeCurrentUpdatedSubscription__
 *
 * To run a query within a React component, call `useSpotifyModeCurrentUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSpotifyModeCurrentUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpotifyModeCurrentUpdatedSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useSpotifyModeCurrentUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<SpotifyModeCurrentUpdatedSubscription, SpotifyModeCurrentUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SpotifyModeCurrentUpdatedSubscription, SpotifyModeCurrentUpdatedSubscriptionVariables>(SpotifyModeCurrentUpdatedDocument, options);
      }
export type SpotifyModeCurrentUpdatedSubscriptionHookResult = ReturnType<typeof useSpotifyModeCurrentUpdatedSubscription>;
export type SpotifyModeCurrentUpdatedSubscriptionResult = Apollo.SubscriptionResult<SpotifyModeCurrentUpdatedSubscription>;
export const SpotifyModeQueueUpdatedDocument = gql`
    subscription spotifyModeQueueUpdated($channelId: String!) {
  spotifyModeQueueUpdated(channelId: $channelId)
}
    `;

/**
 * __useSpotifyModeQueueUpdatedSubscription__
 *
 * To run a query within a React component, call `useSpotifyModeQueueUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSpotifyModeQueueUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpotifyModeQueueUpdatedSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useSpotifyModeQueueUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<SpotifyModeQueueUpdatedSubscription, SpotifyModeQueueUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SpotifyModeQueueUpdatedSubscription, SpotifyModeQueueUpdatedSubscriptionVariables>(SpotifyModeQueueUpdatedDocument, options);
      }
export type SpotifyModeQueueUpdatedSubscriptionHookResult = ReturnType<typeof useSpotifyModeQueueUpdatedSubscription>;
export type SpotifyModeQueueUpdatedSubscriptionResult = Apollo.SubscriptionResult<SpotifyModeQueueUpdatedSubscription>;
export const SpotifyModeHistoryUpdatedDocument = gql`
    subscription spotifyModeHistoryUpdated($channelId: String!) {
  spotifyModeHistoryUpdated(channelId: $channelId)
}
    `;

/**
 * __useSpotifyModeHistoryUpdatedSubscription__
 *
 * To run a query within a React component, call `useSpotifyModeHistoryUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSpotifyModeHistoryUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpotifyModeHistoryUpdatedSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useSpotifyModeHistoryUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<SpotifyModeHistoryUpdatedSubscription, SpotifyModeHistoryUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SpotifyModeHistoryUpdatedSubscription, SpotifyModeHistoryUpdatedSubscriptionVariables>(SpotifyModeHistoryUpdatedDocument, options);
      }
export type SpotifyModeHistoryUpdatedSubscriptionHookResult = ReturnType<typeof useSpotifyModeHistoryUpdatedSubscription>;
export type SpotifyModeHistoryUpdatedSubscriptionResult = Apollo.SubscriptionResult<SpotifyModeHistoryUpdatedSubscription>;