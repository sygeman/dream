import * as Types from '@dream/types';

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