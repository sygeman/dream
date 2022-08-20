import * as Types from '@dream/pepega/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ClipScoreQueryVariables = Types.Exact<{
  clipId: Types.Scalars['String'];
}>;


export type ClipScoreQuery = { __typename?: 'Query', clipScore: number };

export type IncreaseClipScoreMutationVariables = Types.Exact<{
  clipId: Types.Scalars['String'];
}>;


export type IncreaseClipScoreMutation = { __typename?: 'Mutation', increaseClipScore: boolean };

export type DecreaseClipScoreMutationVariables = Types.Exact<{
  clipId: Types.Scalars['String'];
}>;


export type DecreaseClipScoreMutation = { __typename?: 'Mutation', decreaseClipScore: boolean };

export type ClipScoreUpdatedSubscriptionVariables = Types.Exact<{
  clipId: Types.Scalars['String'];
}>;


export type ClipScoreUpdatedSubscription = { __typename?: 'Subscription', clipScoreUpdated: number };


export const ClipScoreDocument = gql`
    query clipScore($clipId: String!) {
  clipScore(clipId: $clipId)
}
    `;

/**
 * __useClipScoreQuery__
 *
 * To run a query within a React component, call `useClipScoreQuery` and pass it any options that fit your needs.
 * When your component renders, `useClipScoreQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClipScoreQuery({
 *   variables: {
 *      clipId: // value for 'clipId'
 *   },
 * });
 */
export function useClipScoreQuery(baseOptions: Apollo.QueryHookOptions<ClipScoreQuery, ClipScoreQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClipScoreQuery, ClipScoreQueryVariables>(ClipScoreDocument, options);
      }
export function useClipScoreLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClipScoreQuery, ClipScoreQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClipScoreQuery, ClipScoreQueryVariables>(ClipScoreDocument, options);
        }
export type ClipScoreQueryHookResult = ReturnType<typeof useClipScoreQuery>;
export type ClipScoreLazyQueryHookResult = ReturnType<typeof useClipScoreLazyQuery>;
export type ClipScoreQueryResult = Apollo.QueryResult<ClipScoreQuery, ClipScoreQueryVariables>;
export const IncreaseClipScoreDocument = gql`
    mutation increaseClipScore($clipId: String!) {
  increaseClipScore(clipId: $clipId)
}
    `;
export type IncreaseClipScoreMutationFn = Apollo.MutationFunction<IncreaseClipScoreMutation, IncreaseClipScoreMutationVariables>;

/**
 * __useIncreaseClipScoreMutation__
 *
 * To run a mutation, you first call `useIncreaseClipScoreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIncreaseClipScoreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [increaseClipScoreMutation, { data, loading, error }] = useIncreaseClipScoreMutation({
 *   variables: {
 *      clipId: // value for 'clipId'
 *   },
 * });
 */
export function useIncreaseClipScoreMutation(baseOptions?: Apollo.MutationHookOptions<IncreaseClipScoreMutation, IncreaseClipScoreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IncreaseClipScoreMutation, IncreaseClipScoreMutationVariables>(IncreaseClipScoreDocument, options);
      }
export type IncreaseClipScoreMutationHookResult = ReturnType<typeof useIncreaseClipScoreMutation>;
export type IncreaseClipScoreMutationResult = Apollo.MutationResult<IncreaseClipScoreMutation>;
export type IncreaseClipScoreMutationOptions = Apollo.BaseMutationOptions<IncreaseClipScoreMutation, IncreaseClipScoreMutationVariables>;
export const DecreaseClipScoreDocument = gql`
    mutation decreaseClipScore($clipId: String!) {
  decreaseClipScore(clipId: $clipId)
}
    `;
export type DecreaseClipScoreMutationFn = Apollo.MutationFunction<DecreaseClipScoreMutation, DecreaseClipScoreMutationVariables>;

/**
 * __useDecreaseClipScoreMutation__
 *
 * To run a mutation, you first call `useDecreaseClipScoreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDecreaseClipScoreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [decreaseClipScoreMutation, { data, loading, error }] = useDecreaseClipScoreMutation({
 *   variables: {
 *      clipId: // value for 'clipId'
 *   },
 * });
 */
export function useDecreaseClipScoreMutation(baseOptions?: Apollo.MutationHookOptions<DecreaseClipScoreMutation, DecreaseClipScoreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DecreaseClipScoreMutation, DecreaseClipScoreMutationVariables>(DecreaseClipScoreDocument, options);
      }
export type DecreaseClipScoreMutationHookResult = ReturnType<typeof useDecreaseClipScoreMutation>;
export type DecreaseClipScoreMutationResult = Apollo.MutationResult<DecreaseClipScoreMutation>;
export type DecreaseClipScoreMutationOptions = Apollo.BaseMutationOptions<DecreaseClipScoreMutation, DecreaseClipScoreMutationVariables>;
export const ClipScoreUpdatedDocument = gql`
    subscription clipScoreUpdated($clipId: String!) {
  clipScoreUpdated(clipId: $clipId)
}
    `;

/**
 * __useClipScoreUpdatedSubscription__
 *
 * To run a query within a React component, call `useClipScoreUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useClipScoreUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClipScoreUpdatedSubscription({
 *   variables: {
 *      clipId: // value for 'clipId'
 *   },
 * });
 */
export function useClipScoreUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<ClipScoreUpdatedSubscription, ClipScoreUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ClipScoreUpdatedSubscription, ClipScoreUpdatedSubscriptionVariables>(ClipScoreUpdatedDocument, options);
      }
export type ClipScoreUpdatedSubscriptionHookResult = ReturnType<typeof useClipScoreUpdatedSubscription>;
export type ClipScoreUpdatedSubscriptionResult = Apollo.SubscriptionResult<ClipScoreUpdatedSubscription>;