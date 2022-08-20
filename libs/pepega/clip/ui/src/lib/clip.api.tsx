import * as Types from '@dream/pepega/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ClipQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type ClipQuery = { __typename?: 'Query', clip?: { __typename?: 'Clip', id: string, sourceUrl: string, title: string, thumbnail_url: string, language: string, broadcaster_id: string, creator_id: string, video_id: string, game_id: string, created_at: string, score: number, createdAt?: string | null, updatedAt?: string | null } | null };

export type ClipsQueryVariables = Types.Exact<{
  input: Types.ClipsInput;
}>;


export type ClipsQuery = { __typename?: 'Query', clips: { __typename?: 'Clips', cursor?: string | null, clips: Array<{ __typename?: 'Clip', id: string, sourceUrl: string, title: string, thumbnail_url: string, language: string, broadcaster_id: string, creator_id: string, video_id: string, game_id: string, created_at: string, score: number, createdAt?: string | null, updatedAt?: string | null }> } };

export type ClipFieldsFragment = { __typename?: 'Clip', id: string, sourceUrl: string, title: string, thumbnail_url: string, language: string, broadcaster_id: string, creator_id: string, video_id: string, game_id: string, created_at: string, score: number, createdAt?: string | null, updatedAt?: string | null };

export const ClipFieldsFragmentDoc = gql`
    fragment ClipFields on Clip {
  id
  sourceUrl
  title
  thumbnail_url
  language
  broadcaster_id
  creator_id
  video_id
  game_id
  created_at
  score
  createdAt
  updatedAt
}
    `;
export const ClipDocument = gql`
    query clip($id: String!) {
  clip(id: $id) {
    ...ClipFields
  }
}
    ${ClipFieldsFragmentDoc}`;

/**
 * __useClipQuery__
 *
 * To run a query within a React component, call `useClipQuery` and pass it any options that fit your needs.
 * When your component renders, `useClipQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClipQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useClipQuery(baseOptions: Apollo.QueryHookOptions<ClipQuery, ClipQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClipQuery, ClipQueryVariables>(ClipDocument, options);
      }
export function useClipLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClipQuery, ClipQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClipQuery, ClipQueryVariables>(ClipDocument, options);
        }
export type ClipQueryHookResult = ReturnType<typeof useClipQuery>;
export type ClipLazyQueryHookResult = ReturnType<typeof useClipLazyQuery>;
export type ClipQueryResult = Apollo.QueryResult<ClipQuery, ClipQueryVariables>;
export const ClipsDocument = gql`
    query clips($input: ClipsInput!) {
  clips(input: $input) {
    cursor
    clips {
      ...ClipFields
    }
  }
}
    ${ClipFieldsFragmentDoc}`;

/**
 * __useClipsQuery__
 *
 * To run a query within a React component, call `useClipsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClipsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClipsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useClipsQuery(baseOptions: Apollo.QueryHookOptions<ClipsQuery, ClipsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClipsQuery, ClipsQueryVariables>(ClipsDocument, options);
      }
export function useClipsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClipsQuery, ClipsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClipsQuery, ClipsQueryVariables>(ClipsDocument, options);
        }
export type ClipsQueryHookResult = ReturnType<typeof useClipsQuery>;
export type ClipsLazyQueryHookResult = ReturnType<typeof useClipsLazyQuery>;
export type ClipsQueryResult = Apollo.QueryResult<ClipsQuery, ClipsQueryVariables>;