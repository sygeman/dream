import * as Types from '@dream/mono-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ChannelMessagesQueryVariables = Types.Exact<{
  channelId: Types.Scalars['ID']['input'];
}>;


export type ChannelMessagesQuery = { __typename?: 'Query', channelMessages: Array<{ __typename?: 'ChannelMessage', id: string, content: string, createdAt: string, tenorGif?: { __typename?: 'TenorGif', id: string, height: number, width: number, preview: string, video: string } | null, user: { __typename?: 'User', id: string, name?: string | null, avatar?: string | null } }> };

export type CreateChannelMessageMutationVariables = Types.Exact<{
  input: Types.ChannelMessageCreateInput;
}>;


export type CreateChannelMessageMutation = { __typename?: 'Mutation', createChannelMessage: boolean };

export type ChannelMessageCreatedSubscriptionVariables = Types.Exact<{
  channelId: Types.Scalars['ID']['input'];
}>;


export type ChannelMessageCreatedSubscription = { __typename?: 'Subscription', channelMessageCreated: { __typename?: 'ChannelMessage', id: string, content: string, createdAt: string, tenorGif?: { __typename?: 'TenorGif', id: string, height: number, width: number, preview: string, video: string } | null, user: { __typename?: 'User', id: string, name?: string | null, avatar?: string | null } } };

export type ChannelMessageDeletedSubscriptionVariables = Types.Exact<{
  channelId: Types.Scalars['ID']['input'];
}>;


export type ChannelMessageDeletedSubscription = { __typename?: 'Subscription', channelMessageDeleted: { __typename?: 'ChannelMessage', id: string, content: string, createdAt: string, tenorGif?: { __typename?: 'TenorGif', id: string, height: number, width: number, preview: string, video: string } | null, user: { __typename?: 'User', id: string, name?: string | null, avatar?: string | null } } };

export type ChannelMessageFieldsFragment = { __typename?: 'ChannelMessage', id: string, content: string, createdAt: string, tenorGif?: { __typename?: 'TenorGif', id: string, height: number, width: number, preview: string, video: string } | null, user: { __typename?: 'User', id: string, name?: string | null, avatar?: string | null } };

export const ChannelMessageFieldsFragmentDoc = gql`
    fragment ChannelMessageFields on ChannelMessage {
  id
  content
  createdAt
  tenorGif {
    id
    height
    width
    preview
    video
  }
  user {
    id
    name
    avatar
  }
}
    `;
export const ChannelMessagesDocument = gql`
    query channelMessages($channelId: ID!) {
  channelMessages(channelId: $channelId) {
    ...ChannelMessageFields
  }
}
    ${ChannelMessageFieldsFragmentDoc}`;

/**
 * __useChannelMessagesQuery__
 *
 * To run a query within a React component, call `useChannelMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useChannelMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelMessagesQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useChannelMessagesQuery(baseOptions: Apollo.QueryHookOptions<ChannelMessagesQuery, ChannelMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChannelMessagesQuery, ChannelMessagesQueryVariables>(ChannelMessagesDocument, options);
      }
export function useChannelMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChannelMessagesQuery, ChannelMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChannelMessagesQuery, ChannelMessagesQueryVariables>(ChannelMessagesDocument, options);
        }
export type ChannelMessagesQueryHookResult = ReturnType<typeof useChannelMessagesQuery>;
export type ChannelMessagesLazyQueryHookResult = ReturnType<typeof useChannelMessagesLazyQuery>;
export type ChannelMessagesQueryResult = Apollo.QueryResult<ChannelMessagesQuery, ChannelMessagesQueryVariables>;
export const CreateChannelMessageDocument = gql`
    mutation createChannelMessage($input: ChannelMessageCreateInput!) {
  createChannelMessage(input: $input)
}
    `;
export type CreateChannelMessageMutationFn = Apollo.MutationFunction<CreateChannelMessageMutation, CreateChannelMessageMutationVariables>;

/**
 * __useCreateChannelMessageMutation__
 *
 * To run a mutation, you first call `useCreateChannelMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChannelMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChannelMessageMutation, { data, loading, error }] = useCreateChannelMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateChannelMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateChannelMessageMutation, CreateChannelMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChannelMessageMutation, CreateChannelMessageMutationVariables>(CreateChannelMessageDocument, options);
      }
export type CreateChannelMessageMutationHookResult = ReturnType<typeof useCreateChannelMessageMutation>;
export type CreateChannelMessageMutationResult = Apollo.MutationResult<CreateChannelMessageMutation>;
export type CreateChannelMessageMutationOptions = Apollo.BaseMutationOptions<CreateChannelMessageMutation, CreateChannelMessageMutationVariables>;
export const ChannelMessageCreatedDocument = gql`
    subscription channelMessageCreated($channelId: ID!) {
  channelMessageCreated(channelId: $channelId) {
    ...ChannelMessageFields
  }
}
    ${ChannelMessageFieldsFragmentDoc}`;

/**
 * __useChannelMessageCreatedSubscription__
 *
 * To run a query within a React component, call `useChannelMessageCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChannelMessageCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelMessageCreatedSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useChannelMessageCreatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<ChannelMessageCreatedSubscription, ChannelMessageCreatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ChannelMessageCreatedSubscription, ChannelMessageCreatedSubscriptionVariables>(ChannelMessageCreatedDocument, options);
      }
export type ChannelMessageCreatedSubscriptionHookResult = ReturnType<typeof useChannelMessageCreatedSubscription>;
export type ChannelMessageCreatedSubscriptionResult = Apollo.SubscriptionResult<ChannelMessageCreatedSubscription>;
export const ChannelMessageDeletedDocument = gql`
    subscription channelMessageDeleted($channelId: ID!) {
  channelMessageDeleted(channelId: $channelId) {
    ...ChannelMessageFields
  }
}
    ${ChannelMessageFieldsFragmentDoc}`;

/**
 * __useChannelMessageDeletedSubscription__
 *
 * To run a query within a React component, call `useChannelMessageDeletedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChannelMessageDeletedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelMessageDeletedSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useChannelMessageDeletedSubscription(baseOptions: Apollo.SubscriptionHookOptions<ChannelMessageDeletedSubscription, ChannelMessageDeletedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ChannelMessageDeletedSubscription, ChannelMessageDeletedSubscriptionVariables>(ChannelMessageDeletedDocument, options);
      }
export type ChannelMessageDeletedSubscriptionHookResult = ReturnType<typeof useChannelMessageDeletedSubscription>;
export type ChannelMessageDeletedSubscriptionResult = Apollo.SubscriptionResult<ChannelMessageDeletedSubscription>;