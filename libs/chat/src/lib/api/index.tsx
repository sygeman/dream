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
  profile?: Maybe<Profile>;
};


export type ChatMessage = {
  __typename?: 'ChatMessage';
  id: Scalars['String'];
  content: Scalars['String'];
  chatId: Scalars['String'];
  authorId: Scalars['String'];
  author: User;
  createdAt: Scalars['String'];
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
  chatId: Scalars['String'];
  onlineCount: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  me: User;
  spotifyToken: Scalars['String'];
  community: Community;
  communities: Array<Community>;
  channel: Channel;
  channels: Array<Channel>;
  chatMessages: Array<ChatMessage>;
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


export type QueryChatMessagesArgs = {
  chatId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  logout: Scalars['Boolean'];
  updateConnectionStatus: Scalars['Boolean'];
  refreshSpotifyToken: Scalars['String'];
  createChatMessage: Scalars['Boolean'];
};


export type MutationUpdateConnectionStatusArgs = {
  channel?: Maybe<Scalars['String']>;
  community?: Maybe<Scalars['String']>;
};


export type MutationCreateChatMessageArgs = {
  input: ChatMessageCreateInput;
};

export type ChatMessageCreateInput = {
  text: Scalars['String'];
  chatId: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  channelUpdated: Channel;
  chatMessageCreated: ChatMessage;
  chatMessageDeleted: ChatMessage;
};


export type SubscriptionChannelUpdatedArgs = {
  id: Scalars['ID'];
};


export type SubscriptionChatMessageCreatedArgs = {
  chatId: Scalars['ID'];
};


export type SubscriptionChatMessageDeletedArgs = {
  chatId: Scalars['ID'];
};

export type ChatMessagesQueryVariables = Exact<{
  chatId: Scalars['ID'];
}>;


export type ChatMessagesQuery = (
  { __typename?: 'Query' }
  & { chatMessages: Array<(
    { __typename?: 'ChatMessage' }
    & ChatMessageFieldsFragment
  )> }
);

export type CreateChatMessageMutationVariables = Exact<{
  input: ChatMessageCreateInput;
}>;


export type CreateChatMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createChatMessage'>
);

export type ChatMessageCreatedSubscriptionVariables = Exact<{
  chatId: Scalars['ID'];
}>;


export type ChatMessageCreatedSubscription = (
  { __typename?: 'Subscription' }
  & { chatMessageCreated: (
    { __typename?: 'ChatMessage' }
    & ChatMessageFieldsFragment
  ) }
);

export type ChatMessageDeletedSubscriptionVariables = Exact<{
  chatId: Scalars['ID'];
}>;


export type ChatMessageDeletedSubscription = (
  { __typename?: 'Subscription' }
  & { chatMessageDeleted: (
    { __typename?: 'ChatMessage' }
    & ChatMessageFieldsFragment
  ) }
);

export type ChatMessageFieldsFragment = (
  { __typename?: 'ChatMessage' }
  & Pick<ChatMessage, 'id' | 'content' | 'createdAt'>
  & { author: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'avatar'>
  ) }
);

export const ChatMessageFieldsFragmentDoc = gql`
    fragment ChatMessageFields on ChatMessage {
  id
  content
  createdAt
  author {
    id
    name
    avatar
  }
}
    `;
export const ChatMessagesDocument = gql`
    query chatMessages($chatId: ID!) {
  chatMessages(chatId: $chatId) {
    ...ChatMessageFields
  }
}
    ${ChatMessageFieldsFragmentDoc}`;

/**
 * __useChatMessagesQuery__
 *
 * To run a query within a React component, call `useChatMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatMessagesQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useChatMessagesQuery(baseOptions: Apollo.QueryHookOptions<ChatMessagesQuery, ChatMessagesQueryVariables>) {
        return Apollo.useQuery<ChatMessagesQuery, ChatMessagesQueryVariables>(ChatMessagesDocument, baseOptions);
      }
export function useChatMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatMessagesQuery, ChatMessagesQueryVariables>) {
          return Apollo.useLazyQuery<ChatMessagesQuery, ChatMessagesQueryVariables>(ChatMessagesDocument, baseOptions);
        }
export type ChatMessagesQueryHookResult = ReturnType<typeof useChatMessagesQuery>;
export type ChatMessagesLazyQueryHookResult = ReturnType<typeof useChatMessagesLazyQuery>;
export type ChatMessagesQueryResult = Apollo.QueryResult<ChatMessagesQuery, ChatMessagesQueryVariables>;
export const CreateChatMessageDocument = gql`
    mutation createChatMessage($input: ChatMessageCreateInput!) {
  createChatMessage(input: $input)
}
    `;
export type CreateChatMessageMutationFn = Apollo.MutationFunction<CreateChatMessageMutation, CreateChatMessageMutationVariables>;

/**
 * __useCreateChatMessageMutation__
 *
 * To run a mutation, you first call `useCreateChatMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChatMessageMutation, { data, loading, error }] = useCreateChatMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateChatMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateChatMessageMutation, CreateChatMessageMutationVariables>) {
        return Apollo.useMutation<CreateChatMessageMutation, CreateChatMessageMutationVariables>(CreateChatMessageDocument, baseOptions);
      }
export type CreateChatMessageMutationHookResult = ReturnType<typeof useCreateChatMessageMutation>;
export type CreateChatMessageMutationResult = Apollo.MutationResult<CreateChatMessageMutation>;
export type CreateChatMessageMutationOptions = Apollo.BaseMutationOptions<CreateChatMessageMutation, CreateChatMessageMutationVariables>;
export const ChatMessageCreatedDocument = gql`
    subscription chatMessageCreated($chatId: ID!) {
  chatMessageCreated(chatId: $chatId) {
    ...ChatMessageFields
  }
}
    ${ChatMessageFieldsFragmentDoc}`;

/**
 * __useChatMessageCreatedSubscription__
 *
 * To run a query within a React component, call `useChatMessageCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChatMessageCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatMessageCreatedSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useChatMessageCreatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<ChatMessageCreatedSubscription, ChatMessageCreatedSubscriptionVariables>) {
        return Apollo.useSubscription<ChatMessageCreatedSubscription, ChatMessageCreatedSubscriptionVariables>(ChatMessageCreatedDocument, baseOptions);
      }
export type ChatMessageCreatedSubscriptionHookResult = ReturnType<typeof useChatMessageCreatedSubscription>;
export type ChatMessageCreatedSubscriptionResult = Apollo.SubscriptionResult<ChatMessageCreatedSubscription>;
export const ChatMessageDeletedDocument = gql`
    subscription chatMessageDeleted($chatId: ID!) {
  chatMessageDeleted(chatId: $chatId) {
    ...ChatMessageFields
  }
}
    ${ChatMessageFieldsFragmentDoc}`;

/**
 * __useChatMessageDeletedSubscription__
 *
 * To run a query within a React component, call `useChatMessageDeletedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChatMessageDeletedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatMessageDeletedSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useChatMessageDeletedSubscription(baseOptions: Apollo.SubscriptionHookOptions<ChatMessageDeletedSubscription, ChatMessageDeletedSubscriptionVariables>) {
        return Apollo.useSubscription<ChatMessageDeletedSubscription, ChatMessageDeletedSubscriptionVariables>(ChatMessageDeletedDocument, baseOptions);
      }
export type ChatMessageDeletedSubscriptionHookResult = ReturnType<typeof useChatMessageDeletedSubscription>;
export type ChatMessageDeletedSubscriptionResult = Apollo.SubscriptionResult<ChatMessageDeletedSubscription>;