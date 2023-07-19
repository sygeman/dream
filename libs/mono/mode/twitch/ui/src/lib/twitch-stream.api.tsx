import * as Types from '@dream/mono-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TwitchStreamQueryVariables = Types.Exact<{
  channelId: Types.Scalars['String']['input'];
}>;


export type TwitchStreamQuery = { __typename?: 'Query', twitchStream: { __typename?: 'TwitchStream', id: string, channelKey?: string | null } };

export type UpdateTwitchStreamMutationVariables = Types.Exact<{
  input: Types.UpdateTwitchStreamInput;
}>;


export type UpdateTwitchStreamMutation = { __typename?: 'Mutation', updateTwitchStream: { __typename?: 'TwitchStream', id: string, channelKey?: string | null } };

export type TwitchStreamFieldsFragment = { __typename?: 'TwitchStream', id: string, channelKey?: string | null };

export const TwitchStreamFieldsFragmentDoc = gql`
    fragment TwitchStreamFields on TwitchStream {
  id
  channelKey
}
    `;
export const TwitchStreamDocument = gql`
    query twitchStream($channelId: String!) {
  twitchStream(channelId: $channelId) {
    ...TwitchStreamFields
  }
}
    ${TwitchStreamFieldsFragmentDoc}`;

/**
 * __useTwitchStreamQuery__
 *
 * To run a query within a React component, call `useTwitchStreamQuery` and pass it any options that fit your needs.
 * When your component renders, `useTwitchStreamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTwitchStreamQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useTwitchStreamQuery(baseOptions: Apollo.QueryHookOptions<TwitchStreamQuery, TwitchStreamQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TwitchStreamQuery, TwitchStreamQueryVariables>(TwitchStreamDocument, options);
      }
export function useTwitchStreamLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TwitchStreamQuery, TwitchStreamQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TwitchStreamQuery, TwitchStreamQueryVariables>(TwitchStreamDocument, options);
        }
export type TwitchStreamQueryHookResult = ReturnType<typeof useTwitchStreamQuery>;
export type TwitchStreamLazyQueryHookResult = ReturnType<typeof useTwitchStreamLazyQuery>;
export type TwitchStreamQueryResult = Apollo.QueryResult<TwitchStreamQuery, TwitchStreamQueryVariables>;
export const UpdateTwitchStreamDocument = gql`
    mutation updateTwitchStream($input: UpdateTwitchStreamInput!) {
  updateTwitchStream(input: $input) {
    ...TwitchStreamFields
  }
}
    ${TwitchStreamFieldsFragmentDoc}`;
export type UpdateTwitchStreamMutationFn = Apollo.MutationFunction<UpdateTwitchStreamMutation, UpdateTwitchStreamMutationVariables>;

/**
 * __useUpdateTwitchStreamMutation__
 *
 * To run a mutation, you first call `useUpdateTwitchStreamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTwitchStreamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTwitchStreamMutation, { data, loading, error }] = useUpdateTwitchStreamMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTwitchStreamMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTwitchStreamMutation, UpdateTwitchStreamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTwitchStreamMutation, UpdateTwitchStreamMutationVariables>(UpdateTwitchStreamDocument, options);
      }
export type UpdateTwitchStreamMutationHookResult = ReturnType<typeof useUpdateTwitchStreamMutation>;
export type UpdateTwitchStreamMutationResult = Apollo.MutationResult<UpdateTwitchStreamMutation>;
export type UpdateTwitchStreamMutationOptions = Apollo.BaseMutationOptions<UpdateTwitchStreamMutation, UpdateTwitchStreamMutationVariables>;