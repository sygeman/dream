import * as Types from '@dream/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ChannelQueryVariables = Types.Exact<{
  name: Types.Scalars['String'];
  communityId: Types.Scalars['String'];
}>;

export type ChannelQuery = {
  __typename?: 'Query';
  channel: {
    __typename?: 'Channel';
    id: string;
    name: string;
    title: string;
    mode: Types.ChannelMode;
    gifAllowed: boolean;
    nsfw: boolean;
    slowmode: number;
    state?: string | null;
    avatar?: string | null;
    onlineCount: number;
  };
};

export type CommunityChannelsQueryVariables = Types.Exact<{
  name: Types.Scalars['String'];
}>;

export type CommunityChannelsQuery = {
  __typename?: 'Query';
  channels: Array<{
    __typename?: 'Channel';
    id: string;
    name: string;
    title: string;
    mode: Types.ChannelMode;
    gifAllowed: boolean;
    nsfw: boolean;
    slowmode: number;
    state?: string | null;
    avatar?: string | null;
    onlineCount: number;
  }>;
};

export type ChannelUsersOnlineQueryVariables = Types.Exact<{
  channelId: Types.Scalars['String'];
}>;

export type ChannelUsersOnlineQuery = {
  __typename?: 'Query';
  channelUsersOnline: Array<{
    __typename?: 'User';
    id: string;
    name?: string | null;
    avatar?: string | null;
  }>;
};

export type CreateChannelMutationVariables = Types.Exact<{
  input: Types.CreateChannelInput;
}>;

export type CreateChannelMutation = {
  __typename?: 'Mutation';
  createChannel: {
    __typename?: 'Channel';
    id: string;
    name: string;
    title: string;
    mode: Types.ChannelMode;
    gifAllowed: boolean;
    nsfw: boolean;
    slowmode: number;
    state?: string | null;
    avatar?: string | null;
    onlineCount: number;
  };
};

export type DeleteChannelMutationVariables = Types.Exact<{
  channelId: Types.Scalars['ID'];
}>;

export type DeleteChannelMutation = {
  __typename?: 'Mutation';
  deleteChannel: {
    __typename?: 'Channel';
    id: string;
    name: string;
    title: string;
    mode: Types.ChannelMode;
    gifAllowed: boolean;
    nsfw: boolean;
    slowmode: number;
    state?: string | null;
    avatar?: string | null;
    onlineCount: number;
  };
};

export type ChannelFieldsFragment = {
  __typename?: 'Channel';
  id: string;
  name: string;
  title: string;
  mode: Types.ChannelMode;
  gifAllowed: boolean;
  nsfw: boolean;
  slowmode: number;
  state?: string | null;
  avatar?: string | null;
  onlineCount: number;
};

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
export const ChannelDocument = gql`
  query channel($name: String!, $communityId: String!) {
    channel(name: $name, communityId: $communityId) {
      ...ChannelFields
    }
  }
  ${ChannelFieldsFragmentDoc}
`;

/**
 * __useChannelQuery__
 *
 * To run a query within a React component, call `useChannelQuery` and pass it any options that fit your needs.
 * When your component renders, `useChannelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelQuery({
 *   variables: {
 *      name: // value for 'name'
 *      communityId: // value for 'communityId'
 *   },
 * });
 */
export function useChannelQuery(
  baseOptions: Apollo.QueryHookOptions<ChannelQuery, ChannelQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ChannelQuery, ChannelQueryVariables>(
    ChannelDocument,
    options
  );
}
export function useChannelLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ChannelQuery, ChannelQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ChannelQuery, ChannelQueryVariables>(
    ChannelDocument,
    options
  );
}
export type ChannelQueryHookResult = ReturnType<typeof useChannelQuery>;
export type ChannelLazyQueryHookResult = ReturnType<typeof useChannelLazyQuery>;
export type ChannelQueryResult = Apollo.QueryResult<
  ChannelQuery,
  ChannelQueryVariables
>;
export const CommunityChannelsDocument = gql`
  query communityChannels($name: String!) {
    channels(name: $name) {
      ...ChannelFields
    }
  }
  ${ChannelFieldsFragmentDoc}
`;

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
export function useCommunityChannelsQuery(
  baseOptions: Apollo.QueryHookOptions<
    CommunityChannelsQuery,
    CommunityChannelsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    CommunityChannelsQuery,
    CommunityChannelsQueryVariables
  >(CommunityChannelsDocument, options);
}
export function useCommunityChannelsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CommunityChannelsQuery,
    CommunityChannelsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    CommunityChannelsQuery,
    CommunityChannelsQueryVariables
  >(CommunityChannelsDocument, options);
}
export type CommunityChannelsQueryHookResult = ReturnType<
  typeof useCommunityChannelsQuery
>;
export type CommunityChannelsLazyQueryHookResult = ReturnType<
  typeof useCommunityChannelsLazyQuery
>;
export type CommunityChannelsQueryResult = Apollo.QueryResult<
  CommunityChannelsQuery,
  CommunityChannelsQueryVariables
>;
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
export function useChannelUsersOnlineQuery(
  baseOptions: Apollo.QueryHookOptions<
    ChannelUsersOnlineQuery,
    ChannelUsersOnlineQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ChannelUsersOnlineQuery,
    ChannelUsersOnlineQueryVariables
  >(ChannelUsersOnlineDocument, options);
}
export function useChannelUsersOnlineLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ChannelUsersOnlineQuery,
    ChannelUsersOnlineQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ChannelUsersOnlineQuery,
    ChannelUsersOnlineQueryVariables
  >(ChannelUsersOnlineDocument, options);
}
export type ChannelUsersOnlineQueryHookResult = ReturnType<
  typeof useChannelUsersOnlineQuery
>;
export type ChannelUsersOnlineLazyQueryHookResult = ReturnType<
  typeof useChannelUsersOnlineLazyQuery
>;
export type ChannelUsersOnlineQueryResult = Apollo.QueryResult<
  ChannelUsersOnlineQuery,
  ChannelUsersOnlineQueryVariables
>;
export const CreateChannelDocument = gql`
  mutation createChannel($input: CreateChannelInput!) {
    createChannel(input: $input) {
      ...ChannelFields
    }
  }
  ${ChannelFieldsFragmentDoc}
`;
export type CreateChannelMutationFn = Apollo.MutationFunction<
  CreateChannelMutation,
  CreateChannelMutationVariables
>;

/**
 * __useCreateChannelMutation__
 *
 * To run a mutation, you first call `useCreateChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChannelMutation, { data, loading, error }] = useCreateChannelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateChannelMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateChannelMutation,
    CreateChannelMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateChannelMutation,
    CreateChannelMutationVariables
  >(CreateChannelDocument, options);
}
export type CreateChannelMutationHookResult = ReturnType<
  typeof useCreateChannelMutation
>;
export type CreateChannelMutationResult =
  Apollo.MutationResult<CreateChannelMutation>;
export type CreateChannelMutationOptions = Apollo.BaseMutationOptions<
  CreateChannelMutation,
  CreateChannelMutationVariables
>;
export const DeleteChannelDocument = gql`
  mutation deleteChannel($channelId: ID!) {
    deleteChannel(channelId: $channelId) {
      ...ChannelFields
    }
  }
  ${ChannelFieldsFragmentDoc}
`;
export type DeleteChannelMutationFn = Apollo.MutationFunction<
  DeleteChannelMutation,
  DeleteChannelMutationVariables
>;

/**
 * __useDeleteChannelMutation__
 *
 * To run a mutation, you first call `useDeleteChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChannelMutation, { data, loading, error }] = useDeleteChannelMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useDeleteChannelMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteChannelMutation,
    DeleteChannelMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteChannelMutation,
    DeleteChannelMutationVariables
  >(DeleteChannelDocument, options);
}
export type DeleteChannelMutationHookResult = ReturnType<
  typeof useDeleteChannelMutation
>;
export type DeleteChannelMutationResult =
  Apollo.MutationResult<DeleteChannelMutation>;
export type DeleteChannelMutationOptions = Apollo.BaseMutationOptions<
  DeleteChannelMutation,
  DeleteChannelMutationVariables
>;
