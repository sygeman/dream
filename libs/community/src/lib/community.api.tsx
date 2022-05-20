import * as Types from '@dream/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CommunityQueryVariables = Types.Exact<{
  name: Types.Scalars['String'];
}>;


export type CommunityQuery = { __typename?: 'Query', community: { __typename?: 'Community', id: string, name?: string | null, title: string, avatar?: string | null, onlineCount: number } };

export type CommunitiesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CommunitiesQuery = { __typename?: 'Query', communities: Array<{ __typename?: 'Community', id: string, name?: string | null, title: string, avatar?: string | null, onlineCount: number }> };

export type EmojiQueryVariables = Types.Exact<{
  emojiId: Types.Scalars['String'];
}>;


export type EmojiQuery = { __typename?: 'Query', emoji: { __typename?: 'Emoji', id: string, type: string, alias: string, authorId: string, createdAt: string, author: { __typename?: 'User', id: string, name?: string | null, avatar?: string | null } } };

export type EmojisQueryVariables = Types.Exact<{
  communityId: Types.Scalars['String'];
}>;


export type EmojisQuery = { __typename?: 'Query', emojis: Array<{ __typename?: 'Emoji', id: string, type: string, alias: string, authorId: string, createdAt: string, author: { __typename?: 'User', id: string, name?: string | null, avatar?: string | null } }> };

export type MeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, name?: string | null, avatar?: string | null, locale: Types.Locale, profiles?: Array<{ __typename?: 'Profile', id: string, provider: string }> | null } };

export type ChannelUsersOnlineQueryVariables = Types.Exact<{
  channelId: Types.Scalars['String'];
}>;


export type ChannelUsersOnlineQuery = { __typename?: 'Query', channelUsersOnline: Array<{ __typename?: 'User', id: string, name?: string | null, avatar?: string | null }> };

export type CommunityChannelsQueryVariables = Types.Exact<{
  name: Types.Scalars['String'];
}>;


export type CommunityChannelsQuery = { __typename?: 'Query', channels: Array<{ __typename?: 'Channel', id: string, name: string, title: string, mode: Types.ChannelMode, gifAllowed: boolean, nsfw: boolean, slowmode: number, state?: string | null, avatar?: string | null, onlineCount: number }> };

export type UpdateEmojiAliasMutationVariables = Types.Exact<{
  emojiId: Types.Scalars['String'];
  alias: Types.Scalars['String'];
}>;


export type UpdateEmojiAliasMutation = { __typename?: 'Mutation', updateEmojiAlias: { __typename?: 'Emoji', id: string, type: string, alias: string, authorId: string, createdAt: string, author: { __typename?: 'User', id: string, name?: string | null, avatar?: string | null } } };

export type DeleteEmojiMutationVariables = Types.Exact<{
  emojiId: Types.Scalars['String'];
}>;


export type DeleteEmojiMutation = { __typename?: 'Mutation', deleteEmoji: boolean };

export type UniqCountQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UniqCountQuery = { __typename?: 'Query', uniqCount: number };

export type CreateCommunityMutationVariables = Types.Exact<{
  input: Types.CreateCommunityInput;
}>;


export type CreateCommunityMutation = { __typename?: 'Mutation', createCommunity: { __typename?: 'Community', id: string, name?: string | null, title: string, avatar?: string | null, onlineCount: number } };

export type UpdateCommunityMutationVariables = Types.Exact<{
  input: Types.UpdateCommunityInput;
}>;


export type UpdateCommunityMutation = { __typename?: 'Mutation', updateCommunity: { __typename?: 'Community', id: string, name?: string | null, title: string, avatar?: string | null, onlineCount: number } };

export type DeleteCommunityMutationVariables = Types.Exact<{
  communityId: Types.Scalars['ID'];
}>;


export type DeleteCommunityMutation = { __typename?: 'Mutation', deleteCommunity: { __typename?: 'Community', id: string, name?: string | null, title: string, avatar?: string | null, onlineCount: number } };

export type CommunityFieldsFragment = { __typename?: 'Community', id: string, name?: string | null, title: string, avatar?: string | null, onlineCount: number };

export type EmojiFieldsFragment = { __typename?: 'Emoji', id: string, type: string, alias: string, authorId: string, createdAt: string, author: { __typename?: 'User', id: string, name?: string | null, avatar?: string | null } };

export type ChannelFieldsFragment = { __typename?: 'Channel', id: string, name: string, title: string, mode: Types.ChannelMode, gifAllowed: boolean, nsfw: boolean, slowmode: number, state?: string | null, avatar?: string | null, onlineCount: number };

export const CommunityFieldsFragmentDoc = gql`
    fragment CommunityFields on Community {
  id
  name
  title
  avatar
  onlineCount
}
    `;
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
export const ChannelFieldsFragmentDoc = gql`
    fragment ChannelFields on Channel {
  id
  name
  title
  mode
  gifAllowed
  nsfw
  slowmode
  state
  avatar
  onlineCount
}
    `;
export const CommunityDocument = gql`
    query community($name: String!) {
  community(name: $name) {
    ...CommunityFields
  }
}
    ${CommunityFieldsFragmentDoc}`;

/**
 * __useCommunityQuery__
 *
 * To run a query within a React component, call `useCommunityQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCommunityQuery(baseOptions: Apollo.QueryHookOptions<CommunityQuery, CommunityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommunityQuery, CommunityQueryVariables>(CommunityDocument, options);
      }
export function useCommunityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommunityQuery, CommunityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommunityQuery, CommunityQueryVariables>(CommunityDocument, options);
        }
export type CommunityQueryHookResult = ReturnType<typeof useCommunityQuery>;
export type CommunityLazyQueryHookResult = ReturnType<typeof useCommunityLazyQuery>;
export type CommunityQueryResult = Apollo.QueryResult<CommunityQuery, CommunityQueryVariables>;
export const CommunitiesDocument = gql`
    query communities {
  communities {
    ...CommunityFields
  }
}
    ${CommunityFieldsFragmentDoc}`;

/**
 * __useCommunitiesQuery__
 *
 * To run a query within a React component, call `useCommunitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCommunitiesQuery(baseOptions?: Apollo.QueryHookOptions<CommunitiesQuery, CommunitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommunitiesQuery, CommunitiesQueryVariables>(CommunitiesDocument, options);
      }
export function useCommunitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommunitiesQuery, CommunitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommunitiesQuery, CommunitiesQueryVariables>(CommunitiesDocument, options);
        }
export type CommunitiesQueryHookResult = ReturnType<typeof useCommunitiesQuery>;
export type CommunitiesLazyQueryHookResult = ReturnType<typeof useCommunitiesLazyQuery>;
export type CommunitiesQueryResult = Apollo.QueryResult<CommunitiesQuery, CommunitiesQueryVariables>;
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
export const MeDocument = gql`
    query me {
  me {
    id
    name
    avatar
    locale
    profiles {
      id
      provider
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ChannelUsersOnlineDocument = gql`
    query channelUsersOnline($channelId: String!) {
  channelUsersOnline(channelId: $channelId) {
    id
    name
    avatar
  }
}
    `;

/**
 * __useChannelUsersOnlineQuery__
 *
 * To run a query within a React component, call `useChannelUsersOnlineQuery` and pass it any options that fit your needs.
 * When your component renders, `useChannelUsersOnlineQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelUsersOnlineQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useChannelUsersOnlineQuery(baseOptions: Apollo.QueryHookOptions<ChannelUsersOnlineQuery, ChannelUsersOnlineQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChannelUsersOnlineQuery, ChannelUsersOnlineQueryVariables>(ChannelUsersOnlineDocument, options);
      }
export function useChannelUsersOnlineLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChannelUsersOnlineQuery, ChannelUsersOnlineQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChannelUsersOnlineQuery, ChannelUsersOnlineQueryVariables>(ChannelUsersOnlineDocument, options);
        }
export type ChannelUsersOnlineQueryHookResult = ReturnType<typeof useChannelUsersOnlineQuery>;
export type ChannelUsersOnlineLazyQueryHookResult = ReturnType<typeof useChannelUsersOnlineLazyQuery>;
export type ChannelUsersOnlineQueryResult = Apollo.QueryResult<ChannelUsersOnlineQuery, ChannelUsersOnlineQueryVariables>;
export const CommunityChannelsDocument = gql`
    query communityChannels($name: String!) {
  channels(name: $name) {
    ...ChannelFields
  }
}
    ${ChannelFieldsFragmentDoc}`;

/**
 * __useCommunityChannelsQuery__
 *
 * To run a query within a React component, call `useCommunityChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityChannelsQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCommunityChannelsQuery(baseOptions: Apollo.QueryHookOptions<CommunityChannelsQuery, CommunityChannelsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommunityChannelsQuery, CommunityChannelsQueryVariables>(CommunityChannelsDocument, options);
      }
export function useCommunityChannelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommunityChannelsQuery, CommunityChannelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommunityChannelsQuery, CommunityChannelsQueryVariables>(CommunityChannelsDocument, options);
        }
export type CommunityChannelsQueryHookResult = ReturnType<typeof useCommunityChannelsQuery>;
export type CommunityChannelsLazyQueryHookResult = ReturnType<typeof useCommunityChannelsLazyQuery>;
export type CommunityChannelsQueryResult = Apollo.QueryResult<CommunityChannelsQuery, CommunityChannelsQueryVariables>;
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
export const UniqCountDocument = gql`
    query uniqCount {
  uniqCount
}
    `;

/**
 * __useUniqCountQuery__
 *
 * To run a query within a React component, call `useUniqCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useUniqCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUniqCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useUniqCountQuery(baseOptions?: Apollo.QueryHookOptions<UniqCountQuery, UniqCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UniqCountQuery, UniqCountQueryVariables>(UniqCountDocument, options);
      }
export function useUniqCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UniqCountQuery, UniqCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UniqCountQuery, UniqCountQueryVariables>(UniqCountDocument, options);
        }
export type UniqCountQueryHookResult = ReturnType<typeof useUniqCountQuery>;
export type UniqCountLazyQueryHookResult = ReturnType<typeof useUniqCountLazyQuery>;
export type UniqCountQueryResult = Apollo.QueryResult<UniqCountQuery, UniqCountQueryVariables>;
export const CreateCommunityDocument = gql`
    mutation createCommunity($input: CreateCommunityInput!) {
  createCommunity(input: $input) {
    ...CommunityFields
  }
}
    ${CommunityFieldsFragmentDoc}`;
export type CreateCommunityMutationFn = Apollo.MutationFunction<CreateCommunityMutation, CreateCommunityMutationVariables>;

/**
 * __useCreateCommunityMutation__
 *
 * To run a mutation, you first call `useCreateCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommunityMutation, { data, loading, error }] = useCreateCommunityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCommunityMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommunityMutation, CreateCommunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommunityMutation, CreateCommunityMutationVariables>(CreateCommunityDocument, options);
      }
export type CreateCommunityMutationHookResult = ReturnType<typeof useCreateCommunityMutation>;
export type CreateCommunityMutationResult = Apollo.MutationResult<CreateCommunityMutation>;
export type CreateCommunityMutationOptions = Apollo.BaseMutationOptions<CreateCommunityMutation, CreateCommunityMutationVariables>;
export const UpdateCommunityDocument = gql`
    mutation updateCommunity($input: UpdateCommunityInput!) {
  updateCommunity(input: $input) {
    ...CommunityFields
  }
}
    ${CommunityFieldsFragmentDoc}`;
export type UpdateCommunityMutationFn = Apollo.MutationFunction<UpdateCommunityMutation, UpdateCommunityMutationVariables>;

/**
 * __useUpdateCommunityMutation__
 *
 * To run a mutation, you first call `useUpdateCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommunityMutation, { data, loading, error }] = useUpdateCommunityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCommunityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommunityMutation, UpdateCommunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommunityMutation, UpdateCommunityMutationVariables>(UpdateCommunityDocument, options);
      }
export type UpdateCommunityMutationHookResult = ReturnType<typeof useUpdateCommunityMutation>;
export type UpdateCommunityMutationResult = Apollo.MutationResult<UpdateCommunityMutation>;
export type UpdateCommunityMutationOptions = Apollo.BaseMutationOptions<UpdateCommunityMutation, UpdateCommunityMutationVariables>;
export const DeleteCommunityDocument = gql`
    mutation deleteCommunity($communityId: ID!) {
  deleteCommunity(communityId: $communityId) {
    ...CommunityFields
  }
}
    ${CommunityFieldsFragmentDoc}`;
export type DeleteCommunityMutationFn = Apollo.MutationFunction<DeleteCommunityMutation, DeleteCommunityMutationVariables>;

/**
 * __useDeleteCommunityMutation__
 *
 * To run a mutation, you first call `useDeleteCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommunityMutation, { data, loading, error }] = useDeleteCommunityMutation({
 *   variables: {
 *      communityId: // value for 'communityId'
 *   },
 * });
 */
export function useDeleteCommunityMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommunityMutation, DeleteCommunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommunityMutation, DeleteCommunityMutationVariables>(DeleteCommunityDocument, options);
      }
export type DeleteCommunityMutationHookResult = ReturnType<typeof useDeleteCommunityMutation>;
export type DeleteCommunityMutationResult = Apollo.MutationResult<DeleteCommunityMutation>;
export type DeleteCommunityMutationOptions = Apollo.BaseMutationOptions<DeleteCommunityMutation, DeleteCommunityMutationVariables>;