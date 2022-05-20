import * as Types from '@dream/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type WaitlistYoutubeHistoryQueryVariables = Types.Exact<{
  channelId: Types.Scalars['String'];
}>;

export type WaitlistYoutubeHistoryQuery = {
  __typename?: 'Query';
  waitlistYoutubeHistory: {
    __typename?: 'YoutubeModeHistory';
    items: Array<{
      __typename?: 'YoutubeModeHistoryItem';
      actions: Array<Types.YoutubeModeHistoryItemAction>;
      data: {
        __typename?: 'YoutubeModeHistoryItemData';
        id: string;
        videoId: string;
        duration: number;
        cover: string;
        title: string;
        startedAt?: string | null;
        endedAt?: string | null;
        author: {
          __typename?: 'YoutubeModeHistoryItemDataAuthor';
          id: string;
          name: string;
          avatar?: string | null;
        };
      };
    }>;
  };
};

export type WaitlistYoutubeHistoryUpdatedSubscriptionVariables = Types.Exact<{
  channelId: Types.Scalars['String'];
}>;

export type WaitlistYoutubeHistoryUpdatedSubscription = {
  __typename?: 'Subscription';
  waitlistYoutubeHistoryUpdated: boolean;
};

export type WaitlistYoutubeCurrentQueryVariables = Types.Exact<{
  channelId: Types.Scalars['String'];
}>;

export type WaitlistYoutubeCurrentQuery = {
  __typename?: 'Query';
  waitlistYoutubeCurrent?: {
    __typename?: 'YoutubeModeCurrent';
    actions: Array<Types.YoutubeModeCurrentAction>;
    item?: {
      __typename?: 'YoutubeModeCurrentItem';
      id: string;
      videoId: string;
      duration: number;
      cover: string;
      title: string;
      startedAt?: string | null;
      author: {
        __typename?: 'YoutubeModeCurrentItemAuthor';
        id: string;
        name: string;
        avatar?: string | null;
      };
    } | null;
  } | null;
};

export type WaitlistYoutubeCurrentUpdatedSubscriptionVariables = Types.Exact<{
  channelId: Types.Scalars['String'];
}>;

export type WaitlistYoutubeCurrentUpdatedSubscription = {
  __typename?: 'Subscription';
  waitlistYoutubeCurrentUpdated: boolean;
};

export type WaitlistYoutubeQueueQueryVariables = Types.Exact<{
  channelId: Types.Scalars['String'];
}>;

export type WaitlistYoutubeQueueQuery = {
  __typename?: 'Query';
  waitlistYoutubeQueue: {
    __typename?: 'YoutubeModeQueue';
    actions: Array<Types.YoutubeModeQueueAction>;
    items: Array<{
      __typename?: 'YoutubeModeQueueItem';
      actions: Array<Types.YoutubeModeQueueItemAction>;
      data: {
        __typename?: 'YoutubeModeQueueItemData';
        id: string;
        videoId: string;
        duration: number;
        cover: string;
        title: string;
        author: {
          __typename?: 'YoutubeModeQueueItemDataAuthor';
          id: string;
          name: string;
          avatar?: string | null;
        };
      };
    }>;
  };
};

export type WaitlistYoutubeQueueUpdatedSubscriptionVariables = Types.Exact<{
  channelId: Types.Scalars['String'];
}>;

export type WaitlistYoutubeQueueUpdatedSubscription = {
  __typename?: 'Subscription';
  waitlistYoutubeQueueUpdated: boolean;
};

export type WaitlistYoutubeQueueAddVideoMutationVariables = Types.Exact<{
  channelId: Types.Scalars['String'];
  videoId: Types.Scalars['String'];
}>;

export type WaitlistYoutubeQueueAddVideoMutation = {
  __typename?: 'Mutation';
  waitlistYoutubeQueueAddVideo: boolean;
};

export type WaitlistYoutubeQueueSkipVideoMutationVariables = Types.Exact<{
  channelId: Types.Scalars['String'];
}>;

export type WaitlistYoutubeQueueSkipVideoMutation = {
  __typename?: 'Mutation';
  waitlistYoutubeQueueSkipVideo: boolean;
};

export const WaitlistYoutubeHistoryDocument = gql`
  query waitlistYoutubeHistory($channelId: String!) {
    waitlistYoutubeHistory(channelId: $channelId) {
      items {
        data {
          id
          videoId
          duration
          cover
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
 * __useWaitlistYoutubeHistoryQuery__
 *
 * To run a query within a React component, call `useWaitlistYoutubeHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useWaitlistYoutubeHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWaitlistYoutubeHistoryQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useWaitlistYoutubeHistoryQuery(
  baseOptions: Apollo.QueryHookOptions<
    WaitlistYoutubeHistoryQuery,
    WaitlistYoutubeHistoryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    WaitlistYoutubeHistoryQuery,
    WaitlistYoutubeHistoryQueryVariables
  >(WaitlistYoutubeHistoryDocument, options);
}
export function useWaitlistYoutubeHistoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    WaitlistYoutubeHistoryQuery,
    WaitlistYoutubeHistoryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    WaitlistYoutubeHistoryQuery,
    WaitlistYoutubeHistoryQueryVariables
  >(WaitlistYoutubeHistoryDocument, options);
}
export type WaitlistYoutubeHistoryQueryHookResult = ReturnType<
  typeof useWaitlistYoutubeHistoryQuery
>;
export type WaitlistYoutubeHistoryLazyQueryHookResult = ReturnType<
  typeof useWaitlistYoutubeHistoryLazyQuery
>;
export type WaitlistYoutubeHistoryQueryResult = Apollo.QueryResult<
  WaitlistYoutubeHistoryQuery,
  WaitlistYoutubeHistoryQueryVariables
>;
export const WaitlistYoutubeHistoryUpdatedDocument = gql`
  subscription waitlistYoutubeHistoryUpdated($channelId: String!) {
    waitlistYoutubeHistoryUpdated(channelId: $channelId)
  }
`;

/**
 * __useWaitlistYoutubeHistoryUpdatedSubscription__
 *
 * To run a query within a React component, call `useWaitlistYoutubeHistoryUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useWaitlistYoutubeHistoryUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWaitlistYoutubeHistoryUpdatedSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useWaitlistYoutubeHistoryUpdatedSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    WaitlistYoutubeHistoryUpdatedSubscription,
    WaitlistYoutubeHistoryUpdatedSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    WaitlistYoutubeHistoryUpdatedSubscription,
    WaitlistYoutubeHistoryUpdatedSubscriptionVariables
  >(WaitlistYoutubeHistoryUpdatedDocument, options);
}
export type WaitlistYoutubeHistoryUpdatedSubscriptionHookResult = ReturnType<
  typeof useWaitlistYoutubeHistoryUpdatedSubscription
>;
export type WaitlistYoutubeHistoryUpdatedSubscriptionResult =
  Apollo.SubscriptionResult<WaitlistYoutubeHistoryUpdatedSubscription>;
export const WaitlistYoutubeCurrentDocument = gql`
  query waitlistYoutubeCurrent($channelId: String!) {
    waitlistYoutubeCurrent(channelId: $channelId) {
      item {
        id
        videoId
        duration
        cover
        title
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
 * __useWaitlistYoutubeCurrentQuery__
 *
 * To run a query within a React component, call `useWaitlistYoutubeCurrentQuery` and pass it any options that fit your needs.
 * When your component renders, `useWaitlistYoutubeCurrentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWaitlistYoutubeCurrentQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useWaitlistYoutubeCurrentQuery(
  baseOptions: Apollo.QueryHookOptions<
    WaitlistYoutubeCurrentQuery,
    WaitlistYoutubeCurrentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    WaitlistYoutubeCurrentQuery,
    WaitlistYoutubeCurrentQueryVariables
  >(WaitlistYoutubeCurrentDocument, options);
}
export function useWaitlistYoutubeCurrentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    WaitlistYoutubeCurrentQuery,
    WaitlistYoutubeCurrentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    WaitlistYoutubeCurrentQuery,
    WaitlistYoutubeCurrentQueryVariables
  >(WaitlistYoutubeCurrentDocument, options);
}
export type WaitlistYoutubeCurrentQueryHookResult = ReturnType<
  typeof useWaitlistYoutubeCurrentQuery
>;
export type WaitlistYoutubeCurrentLazyQueryHookResult = ReturnType<
  typeof useWaitlistYoutubeCurrentLazyQuery
>;
export type WaitlistYoutubeCurrentQueryResult = Apollo.QueryResult<
  WaitlistYoutubeCurrentQuery,
  WaitlistYoutubeCurrentQueryVariables
>;
export const WaitlistYoutubeCurrentUpdatedDocument = gql`
  subscription waitlistYoutubeCurrentUpdated($channelId: String!) {
    waitlistYoutubeCurrentUpdated(channelId: $channelId)
  }
`;

/**
 * __useWaitlistYoutubeCurrentUpdatedSubscription__
 *
 * To run a query within a React component, call `useWaitlistYoutubeCurrentUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useWaitlistYoutubeCurrentUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWaitlistYoutubeCurrentUpdatedSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useWaitlistYoutubeCurrentUpdatedSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    WaitlistYoutubeCurrentUpdatedSubscription,
    WaitlistYoutubeCurrentUpdatedSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    WaitlistYoutubeCurrentUpdatedSubscription,
    WaitlistYoutubeCurrentUpdatedSubscriptionVariables
  >(WaitlistYoutubeCurrentUpdatedDocument, options);
}
export type WaitlistYoutubeCurrentUpdatedSubscriptionHookResult = ReturnType<
  typeof useWaitlistYoutubeCurrentUpdatedSubscription
>;
export type WaitlistYoutubeCurrentUpdatedSubscriptionResult =
  Apollo.SubscriptionResult<WaitlistYoutubeCurrentUpdatedSubscription>;
export const WaitlistYoutubeQueueDocument = gql`
  query waitlistYoutubeQueue($channelId: String!) {
    waitlistYoutubeQueue(channelId: $channelId) {
      items {
        data {
          id
          videoId
          duration
          cover
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
 * __useWaitlistYoutubeQueueQuery__
 *
 * To run a query within a React component, call `useWaitlistYoutubeQueueQuery` and pass it any options that fit your needs.
 * When your component renders, `useWaitlistYoutubeQueueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWaitlistYoutubeQueueQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useWaitlistYoutubeQueueQuery(
  baseOptions: Apollo.QueryHookOptions<
    WaitlistYoutubeQueueQuery,
    WaitlistYoutubeQueueQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    WaitlistYoutubeQueueQuery,
    WaitlistYoutubeQueueQueryVariables
  >(WaitlistYoutubeQueueDocument, options);
}
export function useWaitlistYoutubeQueueLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    WaitlistYoutubeQueueQuery,
    WaitlistYoutubeQueueQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    WaitlistYoutubeQueueQuery,
    WaitlistYoutubeQueueQueryVariables
  >(WaitlistYoutubeQueueDocument, options);
}
export type WaitlistYoutubeQueueQueryHookResult = ReturnType<
  typeof useWaitlistYoutubeQueueQuery
>;
export type WaitlistYoutubeQueueLazyQueryHookResult = ReturnType<
  typeof useWaitlistYoutubeQueueLazyQuery
>;
export type WaitlistYoutubeQueueQueryResult = Apollo.QueryResult<
  WaitlistYoutubeQueueQuery,
  WaitlistYoutubeQueueQueryVariables
>;
export const WaitlistYoutubeQueueUpdatedDocument = gql`
  subscription waitlistYoutubeQueueUpdated($channelId: String!) {
    waitlistYoutubeQueueUpdated(channelId: $channelId)
  }
`;

/**
 * __useWaitlistYoutubeQueueUpdatedSubscription__
 *
 * To run a query within a React component, call `useWaitlistYoutubeQueueUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useWaitlistYoutubeQueueUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWaitlistYoutubeQueueUpdatedSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useWaitlistYoutubeQueueUpdatedSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    WaitlistYoutubeQueueUpdatedSubscription,
    WaitlistYoutubeQueueUpdatedSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    WaitlistYoutubeQueueUpdatedSubscription,
    WaitlistYoutubeQueueUpdatedSubscriptionVariables
  >(WaitlistYoutubeQueueUpdatedDocument, options);
}
export type WaitlistYoutubeQueueUpdatedSubscriptionHookResult = ReturnType<
  typeof useWaitlistYoutubeQueueUpdatedSubscription
>;
export type WaitlistYoutubeQueueUpdatedSubscriptionResult =
  Apollo.SubscriptionResult<WaitlistYoutubeQueueUpdatedSubscription>;
export const WaitlistYoutubeQueueAddVideoDocument = gql`
  mutation waitlistYoutubeQueueAddVideo(
    $channelId: String!
    $videoId: String!
  ) {
    waitlistYoutubeQueueAddVideo(channelId: $channelId, videoId: $videoId)
  }
`;
export type WaitlistYoutubeQueueAddVideoMutationFn = Apollo.MutationFunction<
  WaitlistYoutubeQueueAddVideoMutation,
  WaitlistYoutubeQueueAddVideoMutationVariables
>;

/**
 * __useWaitlistYoutubeQueueAddVideoMutation__
 *
 * To run a mutation, you first call `useWaitlistYoutubeQueueAddVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWaitlistYoutubeQueueAddVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [waitlistYoutubeQueueAddVideoMutation, { data, loading, error }] = useWaitlistYoutubeQueueAddVideoMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useWaitlistYoutubeQueueAddVideoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    WaitlistYoutubeQueueAddVideoMutation,
    WaitlistYoutubeQueueAddVideoMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    WaitlistYoutubeQueueAddVideoMutation,
    WaitlistYoutubeQueueAddVideoMutationVariables
  >(WaitlistYoutubeQueueAddVideoDocument, options);
}
export type WaitlistYoutubeQueueAddVideoMutationHookResult = ReturnType<
  typeof useWaitlistYoutubeQueueAddVideoMutation
>;
export type WaitlistYoutubeQueueAddVideoMutationResult =
  Apollo.MutationResult<WaitlistYoutubeQueueAddVideoMutation>;
export type WaitlistYoutubeQueueAddVideoMutationOptions =
  Apollo.BaseMutationOptions<
    WaitlistYoutubeQueueAddVideoMutation,
    WaitlistYoutubeQueueAddVideoMutationVariables
  >;
export const WaitlistYoutubeQueueSkipVideoDocument = gql`
  mutation waitlistYoutubeQueueSkipVideo($channelId: String!) {
    waitlistYoutubeQueueSkipVideo(channelId: $channelId)
  }
`;
export type WaitlistYoutubeQueueSkipVideoMutationFn = Apollo.MutationFunction<
  WaitlistYoutubeQueueSkipVideoMutation,
  WaitlistYoutubeQueueSkipVideoMutationVariables
>;

/**
 * __useWaitlistYoutubeQueueSkipVideoMutation__
 *
 * To run a mutation, you first call `useWaitlistYoutubeQueueSkipVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWaitlistYoutubeQueueSkipVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [waitlistYoutubeQueueSkipVideoMutation, { data, loading, error }] = useWaitlistYoutubeQueueSkipVideoMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useWaitlistYoutubeQueueSkipVideoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    WaitlistYoutubeQueueSkipVideoMutation,
    WaitlistYoutubeQueueSkipVideoMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    WaitlistYoutubeQueueSkipVideoMutation,
    WaitlistYoutubeQueueSkipVideoMutationVariables
  >(WaitlistYoutubeQueueSkipVideoDocument, options);
}
export type WaitlistYoutubeQueueSkipVideoMutationHookResult = ReturnType<
  typeof useWaitlistYoutubeQueueSkipVideoMutation
>;
export type WaitlistYoutubeQueueSkipVideoMutationResult =
  Apollo.MutationResult<WaitlistYoutubeQueueSkipVideoMutation>;
export type WaitlistYoutubeQueueSkipVideoMutationOptions =
  Apollo.BaseMutationOptions<
    WaitlistYoutubeQueueSkipVideoMutation,
    WaitlistYoutubeQueueSkipVideoMutationVariables
  >;
