import * as Types from '@dream/pepega/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SetClipHistoryMutationVariables = Types.Exact<{
  clipId: Types.Scalars['String'];
}>;


export type SetClipHistoryMutation = { __typename?: 'Mutation', setClipHistory: boolean };


export const SetClipHistoryDocument = gql`
    mutation setClipHistory($clipId: String!) {
  setClipHistory(clipId: $clipId)
}
    `;
export type SetClipHistoryMutationFn = Apollo.MutationFunction<SetClipHistoryMutation, SetClipHistoryMutationVariables>;

/**
 * __useSetClipHistoryMutation__
 *
 * To run a mutation, you first call `useSetClipHistoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetClipHistoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setClipHistoryMutation, { data, loading, error }] = useSetClipHistoryMutation({
 *   variables: {
 *      clipId: // value for 'clipId'
 *   },
 * });
 */
export function useSetClipHistoryMutation(baseOptions?: Apollo.MutationHookOptions<SetClipHistoryMutation, SetClipHistoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetClipHistoryMutation, SetClipHistoryMutationVariables>(SetClipHistoryDocument, options);
      }
export type SetClipHistoryMutationHookResult = ReturnType<typeof useSetClipHistoryMutation>;
export type SetClipHistoryMutationResult = Apollo.MutationResult<SetClipHistoryMutation>;
export type SetClipHistoryMutationOptions = Apollo.BaseMutationOptions<SetClipHistoryMutation, SetClipHistoryMutationVariables>;