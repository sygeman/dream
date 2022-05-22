import * as Types from '@dream/pepega/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type IncreaseClipScoreMutationVariables = Types.Exact<{
  clipId: Types.Scalars['String'];
}>;


export type IncreaseClipScoreMutation = { __typename?: 'Mutation', increaseClipScore: boolean };

export type DecreaseClipScoreMutationVariables = Types.Exact<{
  clipId: Types.Scalars['String'];
}>;


export type DecreaseClipScoreMutation = { __typename?: 'Mutation', decreaseClipScore: boolean };


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