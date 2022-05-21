import * as Types from '@dream/mono/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EmojiQueryVariables = Types.Exact<{
  emojiId: Types.Scalars['String'];
}>;


export type EmojiQuery = { __typename?: 'Query', emoji: { __typename?: 'Emoji', id: string, type: string, alias: string, authorId: string, createdAt: string, author: { __typename?: 'User', id: string, name?: string | null, avatar?: string | null } } };

export type EmojisQueryVariables = Types.Exact<{
  communityId: Types.Scalars['String'];
}>;


export type EmojisQuery = { __typename?: 'Query', emojis: Array<{ __typename?: 'Emoji', id: string, type: string, alias: string, authorId: string, createdAt: string, author: { __typename?: 'User', id: string, name?: string | null, avatar?: string | null } }> };

export type UpdateEmojiAliasMutationVariables = Types.Exact<{
  emojiId: Types.Scalars['String'];
  alias: Types.Scalars['String'];
}>;


export type UpdateEmojiAliasMutation = { __typename?: 'Mutation', updateEmojiAlias: { __typename?: 'Emoji', id: string, type: string, alias: string, authorId: string, createdAt: string, author: { __typename?: 'User', id: string, name?: string | null, avatar?: string | null } } };

export type DeleteEmojiMutationVariables = Types.Exact<{
  emojiId: Types.Scalars['String'];
}>;


export type DeleteEmojiMutation = { __typename?: 'Mutation', deleteEmoji: boolean };

export type EmojiFieldsFragment = { __typename?: 'Emoji', id: string, type: string, alias: string, authorId: string, createdAt: string, author: { __typename?: 'User', id: string, name?: string | null, avatar?: string | null } };

export const EmojiFieldsFragmentDoc = gql`
    fragment EmojiFields on Emoji {
  id
  type
  alias
  authorId
  author {
    id
    name
    avatar
  }
  createdAt
}
    `;
export const EmojiDocument = gql`
    query emoji($emojiId: String!) {
  emoji(emojiId: $emojiId) {
    ...EmojiFields
  }
}
    ${EmojiFieldsFragmentDoc}`;

/**
 * __useEmojiQuery__
 *
 * To run a query within a React component, call `useEmojiQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmojiQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmojiQuery({
 *   variables: {
 *      emojiId: // value for 'emojiId'
 *   },
 * });
 */
export function useEmojiQuery(baseOptions: Apollo.QueryHookOptions<EmojiQuery, EmojiQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EmojiQuery, EmojiQueryVariables>(EmojiDocument, options);
      }
export function useEmojiLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EmojiQuery, EmojiQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EmojiQuery, EmojiQueryVariables>(EmojiDocument, options);
        }
export type EmojiQueryHookResult = ReturnType<typeof useEmojiQuery>;
export type EmojiLazyQueryHookResult = ReturnType<typeof useEmojiLazyQuery>;
export type EmojiQueryResult = Apollo.QueryResult<EmojiQuery, EmojiQueryVariables>;
export const EmojisDocument = gql`
    query emojis($communityId: String!) {
  emojis(communityId: $communityId) {
    ...EmojiFields
  }
}
    ${EmojiFieldsFragmentDoc}`;

/**
 * __useEmojisQuery__
 *
 * To run a query within a React component, call `useEmojisQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmojisQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmojisQuery({
 *   variables: {
 *      communityId: // value for 'communityId'
 *   },
 * });
 */
export function useEmojisQuery(baseOptions: Apollo.QueryHookOptions<EmojisQuery, EmojisQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EmojisQuery, EmojisQueryVariables>(EmojisDocument, options);
      }
export function useEmojisLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EmojisQuery, EmojisQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EmojisQuery, EmojisQueryVariables>(EmojisDocument, options);
        }
export type EmojisQueryHookResult = ReturnType<typeof useEmojisQuery>;
export type EmojisLazyQueryHookResult = ReturnType<typeof useEmojisLazyQuery>;
export type EmojisQueryResult = Apollo.QueryResult<EmojisQuery, EmojisQueryVariables>;
export const UpdateEmojiAliasDocument = gql`
    mutation updateEmojiAlias($emojiId: String!, $alias: String!) {
  updateEmojiAlias(emojiId: $emojiId, alias: $alias) {
    ...EmojiFields
  }
}
    ${EmojiFieldsFragmentDoc}`;
export type UpdateEmojiAliasMutationFn = Apollo.MutationFunction<UpdateEmojiAliasMutation, UpdateEmojiAliasMutationVariables>;

/**
 * __useUpdateEmojiAliasMutation__
 *
 * To run a mutation, you first call `useUpdateEmojiAliasMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEmojiAliasMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEmojiAliasMutation, { data, loading, error }] = useUpdateEmojiAliasMutation({
 *   variables: {
 *      emojiId: // value for 'emojiId'
 *      alias: // value for 'alias'
 *   },
 * });
 */
export function useUpdateEmojiAliasMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEmojiAliasMutation, UpdateEmojiAliasMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEmojiAliasMutation, UpdateEmojiAliasMutationVariables>(UpdateEmojiAliasDocument, options);
      }
export type UpdateEmojiAliasMutationHookResult = ReturnType<typeof useUpdateEmojiAliasMutation>;
export type UpdateEmojiAliasMutationResult = Apollo.MutationResult<UpdateEmojiAliasMutation>;
export type UpdateEmojiAliasMutationOptions = Apollo.BaseMutationOptions<UpdateEmojiAliasMutation, UpdateEmojiAliasMutationVariables>;
export const DeleteEmojiDocument = gql`
    mutation deleteEmoji($emojiId: String!) {
  deleteEmoji(emojiId: $emojiId)
}
    `;
export type DeleteEmojiMutationFn = Apollo.MutationFunction<DeleteEmojiMutation, DeleteEmojiMutationVariables>;

/**
 * __useDeleteEmojiMutation__
 *
 * To run a mutation, you first call `useDeleteEmojiMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEmojiMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEmojiMutation, { data, loading, error }] = useDeleteEmojiMutation({
 *   variables: {
 *      emojiId: // value for 'emojiId'
 *   },
 * });
 */
export function useDeleteEmojiMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEmojiMutation, DeleteEmojiMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEmojiMutation, DeleteEmojiMutationVariables>(DeleteEmojiDocument, options);
      }
export type DeleteEmojiMutationHookResult = ReturnType<typeof useDeleteEmojiMutation>;
export type DeleteEmojiMutationResult = Apollo.MutationResult<DeleteEmojiMutation>;
export type DeleteEmojiMutationOptions = Apollo.BaseMutationOptions<DeleteEmojiMutation, DeleteEmojiMutationVariables>;