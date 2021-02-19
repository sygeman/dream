import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Profile = {
  __typename?: 'Profile';
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  profiles?: Maybe<Array<Profile>>;
};


export type Community = {
  __typename?: 'Community';
  id: Scalars['String'];
  name: Scalars['String'];
  title: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  onlineCount: Scalars['Float'];
};

export type Channel = {
  __typename?: 'Channel';
  id: Scalars['String'];
  name: Scalars['String'];
  title: Scalars['String'];
  state?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  onlineCount: Scalars['Float'];
};

export type ChannelMessage = {
  __typename?: 'ChannelMessage';
  id: Scalars['String'];
  content: Scalars['String'];
  channelId: Scalars['String'];
  userId: Scalars['String'];
  user: User;
  createdAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  uniqCount: Scalars['Int'];
  user?: Maybe<User>;
  me: User;
  spotifyToken: Scalars['String'];
  community: Community;
  communities: Array<Community>;
  channel: Channel;
  channels: Array<Channel>;
  channelMessages: Array<ChannelMessage>;
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryCommunityArgs = {
  name: Scalars['String'];
};


export type QueryChannelArgs = {
  name: Scalars['String'];
};


export type QueryChannelsArgs = {
  name: Scalars['String'];
};


export type QueryChannelMessagesArgs = {
  channelId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  logout: Scalars['Boolean'];
  updateConnectionStatus: Scalars['Boolean'];
  refreshSpotifyToken: Scalars['String'];
  createChannelMessage: Scalars['Boolean'];
};


export type MutationUpdateConnectionStatusArgs = {
  channel?: Maybe<Scalars['String']>;
  community?: Maybe<Scalars['String']>;
};


export type MutationCreateChannelMessageArgs = {
  input: ChannelMessageCreateInput;
};

export type ChannelMessageCreateInput = {
  content: Scalars['String'];
  channelId: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  channelMessageCreated: ChannelMessage;
  channelMessageDeleted: ChannelMessage;
};


export type SubscriptionChannelMessageCreatedArgs = {
  channelId: Scalars['ID'];
};


export type SubscriptionChannelMessageDeletedArgs = {
  channelId: Scalars['ID'];
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'avatar'>
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type UpdateConnectionStatusMutationVariables = Exact<{
  channel?: Maybe<Scalars['String']>;
  community?: Maybe<Scalars['String']>;
}>;


export type UpdateConnectionStatusMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateConnectionStatus'>
);


export const MeDocument = gql`
    query me {
  me {
    id
    name
    avatar
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
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const UpdateConnectionStatusDocument = gql`
    mutation updateConnectionStatus($channel: String, $community: String) {
  updateConnectionStatus(channel: $channel, community: $community)
}
    `;
export type UpdateConnectionStatusMutationFn = Apollo.MutationFunction<UpdateConnectionStatusMutation, UpdateConnectionStatusMutationVariables>;

/**
 * __useUpdateConnectionStatusMutation__
 *
 * To run a mutation, you first call `useUpdateConnectionStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateConnectionStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateConnectionStatusMutation, { data, loading, error }] = useUpdateConnectionStatusMutation({
 *   variables: {
 *      channel: // value for 'channel'
 *      community: // value for 'community'
 *   },
 * });
 */
export function useUpdateConnectionStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateConnectionStatusMutation, UpdateConnectionStatusMutationVariables>) {
        return Apollo.useMutation<UpdateConnectionStatusMutation, UpdateConnectionStatusMutationVariables>(UpdateConnectionStatusDocument, baseOptions);
      }
export type UpdateConnectionStatusMutationHookResult = ReturnType<typeof useUpdateConnectionStatusMutation>;
export type UpdateConnectionStatusMutationResult = Apollo.MutationResult<UpdateConnectionStatusMutation>;
export type UpdateConnectionStatusMutationOptions = Apollo.BaseMutationOptions<UpdateConnectionStatusMutation, UpdateConnectionStatusMutationVariables>;