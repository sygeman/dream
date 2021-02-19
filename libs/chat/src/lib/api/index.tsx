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

export type ChannelMessagesQueryVariables = Exact<{
  channelId: Scalars['ID'];
}>;


export type ChannelMessagesQuery = (
  { __typename?: 'Query' }
  & { channelMessages: Array<(
    { __typename?: 'ChannelMessage' }
    & ChannelMessageFieldsFragment
  )> }
);

export type CreateChannelMessageMutationVariables = Exact<{
  input: ChannelMessageCreateInput;
}>;


export type CreateChannelMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createChannelMessage'>
);

export type ChannelMessageCreatedSubscriptionVariables = Exact<{
  channelId: Scalars['ID'];
}>;


export type ChannelMessageCreatedSubscription = (
  { __typename?: 'Subscription' }
  & { channelMessageCreated: (
    { __typename?: 'ChannelMessage' }
    & ChannelMessageFieldsFragment
  ) }
);

export type ChannelMessageDeletedSubscriptionVariables = Exact<{
  channelId: Scalars['ID'];
}>;


export type ChannelMessageDeletedSubscription = (
  { __typename?: 'Subscription' }
  & { channelMessageDeleted: (
    { __typename?: 'ChannelMessage' }
    & ChannelMessageFieldsFragment
  ) }
);

export type ChannelMessageFieldsFragment = (
  { __typename?: 'ChannelMessage' }
  & Pick<ChannelMessage, 'id' | 'content' | 'createdAt'>
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'avatar'>
  ) }
);

export const ChannelMessageFieldsFragmentDoc = gql`
    fragment ChannelMessageFields on ChannelMessage {
  id
  content
  createdAt
  user {
    id
    name
    avatar
  }
}
    `;
export const ChannelMessagesDocument = gql`
    query ChannelMessages($channelId: ID!) {
  channelMessages(channelId: $channelId) {
    ...ChannelMessageFields
  }
}
    ${ChannelMessageFieldsFragmentDoc}`;

/**
 * __useChannelMessagesQuery__
 *
 * To run a query within a React component, call `useChannelMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useChannelMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelMessagesQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useChannelMessagesQuery(baseOptions: Apollo.QueryHookOptions<ChannelMessagesQuery, ChannelMessagesQueryVariables>) {
        return Apollo.useQuery<ChannelMessagesQuery, ChannelMessagesQueryVariables>(ChannelMessagesDocument, baseOptions);
      }
export function useChannelMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChannelMessagesQuery, ChannelMessagesQueryVariables>) {
          return Apollo.useLazyQuery<ChannelMessagesQuery, ChannelMessagesQueryVariables>(ChannelMessagesDocument, baseOptions);
        }
export type ChannelMessagesQueryHookResult = ReturnType<typeof useChannelMessagesQuery>;
export type ChannelMessagesLazyQueryHookResult = ReturnType<typeof useChannelMessagesLazyQuery>;
export type ChannelMessagesQueryResult = Apollo.QueryResult<ChannelMessagesQuery, ChannelMessagesQueryVariables>;
export const CreateChannelMessageDocument = gql`
    mutation createChannelMessage($input: ChannelMessageCreateInput!) {
  createChannelMessage(input: $input)
}
    `;
export type CreateChannelMessageMutationFn = Apollo.MutationFunction<CreateChannelMessageMutation, CreateChannelMessageMutationVariables>;

/**
 * __useCreateChannelMessageMutation__
 *
 * To run a mutation, you first call `useCreateChannelMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChannelMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChannelMessageMutation, { data, loading, error }] = useCreateChannelMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateChannelMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateChannelMessageMutation, CreateChannelMessageMutationVariables>) {
        return Apollo.useMutation<CreateChannelMessageMutation, CreateChannelMessageMutationVariables>(CreateChannelMessageDocument, baseOptions);
      }
export type CreateChannelMessageMutationHookResult = ReturnType<typeof useCreateChannelMessageMutation>;
export type CreateChannelMessageMutationResult = Apollo.MutationResult<CreateChannelMessageMutation>;
export type CreateChannelMessageMutationOptions = Apollo.BaseMutationOptions<CreateChannelMessageMutation, CreateChannelMessageMutationVariables>;
export const ChannelMessageCreatedDocument = gql`
    subscription ChannelMessageCreated($channelId: ID!) {
  channelMessageCreated(channelId: $channelId) {
    ...ChannelMessageFields
  }
}
    ${ChannelMessageFieldsFragmentDoc}`;

/**
 * __useChannelMessageCreatedSubscription__
 *
 * To run a query within a React component, call `useChannelMessageCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChannelMessageCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelMessageCreatedSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useChannelMessageCreatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<ChannelMessageCreatedSubscription, ChannelMessageCreatedSubscriptionVariables>) {
        return Apollo.useSubscription<ChannelMessageCreatedSubscription, ChannelMessageCreatedSubscriptionVariables>(ChannelMessageCreatedDocument, baseOptions);
      }
export type ChannelMessageCreatedSubscriptionHookResult = ReturnType<typeof useChannelMessageCreatedSubscription>;
export type ChannelMessageCreatedSubscriptionResult = Apollo.SubscriptionResult<ChannelMessageCreatedSubscription>;
export const ChannelMessageDeletedDocument = gql`
    subscription ChannelMessageDeleted($channelId: ID!) {
  channelMessageDeleted(channelId: $channelId) {
    ...ChannelMessageFields
  }
}
    ${ChannelMessageFieldsFragmentDoc}`;

/**
 * __useChannelMessageDeletedSubscription__
 *
 * To run a query within a React component, call `useChannelMessageDeletedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChannelMessageDeletedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelMessageDeletedSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useChannelMessageDeletedSubscription(baseOptions: Apollo.SubscriptionHookOptions<ChannelMessageDeletedSubscription, ChannelMessageDeletedSubscriptionVariables>) {
        return Apollo.useSubscription<ChannelMessageDeletedSubscription, ChannelMessageDeletedSubscriptionVariables>(ChannelMessageDeletedDocument, baseOptions);
      }
export type ChannelMessageDeletedSubscriptionHookResult = ReturnType<typeof useChannelMessageDeletedSubscription>;
export type ChannelMessageDeletedSubscriptionResult = Apollo.SubscriptionResult<ChannelMessageDeletedSubscription>;