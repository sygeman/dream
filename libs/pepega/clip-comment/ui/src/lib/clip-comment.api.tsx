import * as Types from '@dream/pepega/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ClipCommentsQueryVariables = Types.Exact<{
  clipId: Types.Scalars['ID'];
}>;


export type ClipCommentsQuery = { __typename?: 'Query', clipComments: Array<{ __typename?: 'ClipComment', id: string, userId: string, content: string, createdAt: string, user: { __typename?: 'ClipCommentUser', id: string, role?: Types.UserRole | null, name?: string | null, avatar?: string | null } }> };

export type RemoveClipCommentMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type RemoveClipCommentMutation = { __typename?: 'Mutation', removeClipComment: boolean };

export type ClipCommentCreatedSubscriptionVariables = Types.Exact<{
  clipId: Types.Scalars['ID'];
}>;


export type ClipCommentCreatedSubscription = { __typename?: 'Subscription', clipCommentCreated: { __typename?: 'ClipComment', id: string, userId: string, content: string, createdAt: string, user: { __typename?: 'ClipCommentUser', id: string, role?: Types.UserRole | null, name?: string | null, avatar?: string | null } } };

export type ClipCommentRemovedSubscriptionVariables = Types.Exact<{
  clipId: Types.Scalars['ID'];
}>;


export type ClipCommentRemovedSubscription = { __typename?: 'Subscription', clipCommentRemoved: string };

export type ClipCommentFieldsFragment = { __typename?: 'ClipComment', id: string, userId: string, content: string, createdAt: string, user: { __typename?: 'ClipCommentUser', id: string, role?: Types.UserRole | null, name?: string | null, avatar?: string | null } };

export const ClipCommentFieldsFragmentDoc = gql`
    fragment ClipCommentFields on ClipComment {
  id
  userId
  user {
    id
    role
    name
    avatar
  }
  content
  createdAt
}
    `;
export const ClipCommentsDocument = gql`
    query clipComments($clipId: ID!) {
  clipComments(clipId: $clipId) {
    ...ClipCommentFields
  }
}
    ${ClipCommentFieldsFragmentDoc}`;

/**
 * __useClipCommentsQuery__
 *
 * To run a query within a React component, call `useClipCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClipCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClipCommentsQuery({
 *   variables: {
 *      clipId: // value for 'clipId'
 *   },
 * });
 */
export function useClipCommentsQuery(baseOptions: Apollo.QueryHookOptions<ClipCommentsQuery, ClipCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClipCommentsQuery, ClipCommentsQueryVariables>(ClipCommentsDocument, options);
      }
export function useClipCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClipCommentsQuery, ClipCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClipCommentsQuery, ClipCommentsQueryVariables>(ClipCommentsDocument, options);
        }
export type ClipCommentsQueryHookResult = ReturnType<typeof useClipCommentsQuery>;
export type ClipCommentsLazyQueryHookResult = ReturnType<typeof useClipCommentsLazyQuery>;
export type ClipCommentsQueryResult = Apollo.QueryResult<ClipCommentsQuery, ClipCommentsQueryVariables>;
export const RemoveClipCommentDocument = gql`
    mutation removeClipComment($id: ID!) {
  removeClipComment(id: $id)
}
    `;
export type RemoveClipCommentMutationFn = Apollo.MutationFunction<RemoveClipCommentMutation, RemoveClipCommentMutationVariables>;

/**
 * __useRemoveClipCommentMutation__
 *
 * To run a mutation, you first call `useRemoveClipCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveClipCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeClipCommentMutation, { data, loading, error }] = useRemoveClipCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveClipCommentMutation(baseOptions?: Apollo.MutationHookOptions<RemoveClipCommentMutation, RemoveClipCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveClipCommentMutation, RemoveClipCommentMutationVariables>(RemoveClipCommentDocument, options);
      }
export type RemoveClipCommentMutationHookResult = ReturnType<typeof useRemoveClipCommentMutation>;
export type RemoveClipCommentMutationResult = Apollo.MutationResult<RemoveClipCommentMutation>;
export type RemoveClipCommentMutationOptions = Apollo.BaseMutationOptions<RemoveClipCommentMutation, RemoveClipCommentMutationVariables>;
export const ClipCommentCreatedDocument = gql`
    subscription clipCommentCreated($clipId: ID!) {
  clipCommentCreated(clipId: $clipId) {
    ...ClipCommentFields
  }
}
    ${ClipCommentFieldsFragmentDoc}`;

/**
 * __useClipCommentCreatedSubscription__
 *
 * To run a query within a React component, call `useClipCommentCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useClipCommentCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClipCommentCreatedSubscription({
 *   variables: {
 *      clipId: // value for 'clipId'
 *   },
 * });
 */
export function useClipCommentCreatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<ClipCommentCreatedSubscription, ClipCommentCreatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ClipCommentCreatedSubscription, ClipCommentCreatedSubscriptionVariables>(ClipCommentCreatedDocument, options);
      }
export type ClipCommentCreatedSubscriptionHookResult = ReturnType<typeof useClipCommentCreatedSubscription>;
export type ClipCommentCreatedSubscriptionResult = Apollo.SubscriptionResult<ClipCommentCreatedSubscription>;
export const ClipCommentRemovedDocument = gql`
    subscription clipCommentRemoved($clipId: ID!) {
  clipCommentRemoved(clipId: $clipId)
}
    `;

/**
 * __useClipCommentRemovedSubscription__
 *
 * To run a query within a React component, call `useClipCommentRemovedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useClipCommentRemovedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClipCommentRemovedSubscription({
 *   variables: {
 *      clipId: // value for 'clipId'
 *   },
 * });
 */
export function useClipCommentRemovedSubscription(baseOptions: Apollo.SubscriptionHookOptions<ClipCommentRemovedSubscription, ClipCommentRemovedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ClipCommentRemovedSubscription, ClipCommentRemovedSubscriptionVariables>(ClipCommentRemovedDocument, options);
      }
export type ClipCommentRemovedSubscriptionHookResult = ReturnType<typeof useClipCommentRemovedSubscription>;
export type ClipCommentRemovedSubscriptionResult = Apollo.SubscriptionResult<ClipCommentRemovedSubscription>;