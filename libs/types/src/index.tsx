import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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

export type Channel = {
  __typename?: 'Channel';
  id: Scalars['String'];
  name: Scalars['String'];
  title: Scalars['String'];
  state?: Maybe<Scalars['String']>;
  mode: ChannelMode;
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

export type ChannelMessageCreateInput = {
  content: Scalars['String'];
  channelId: Scalars['String'];
};

export enum ChannelMode {
  None = 'NONE',
  WaitlistYoutube = 'WAITLIST_YOUTUBE',
  WaitlistSpotify = 'WAITLIST_SPOTIFY',
  StreamTwitch = 'STREAM_TWITCH',
  StreamYoutube = 'STREAM_YOUTUBE',
  CollectionSpotify = 'COLLECTION_SPOTIFY',
  CollectionYoutube = 'COLLECTION_YOUTUBE'
}

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

export type CreateChannelInput = {
  communityId: Scalars['ID'];
  name: Scalars['String'];
  title: Scalars['String'];
};

export type CreateCommunityInput = {
  name: Scalars['String'];
  title: Scalars['String'];
};


export enum Locale {
  EnUs = 'en_US',
  RuRu = 'ru_RU'
}

export type ModeWaitlistSpotifyCurrent = {
  __typename?: 'ModeWaitlistSpotifyCurrent';
  actions: Array<ModeWaitlistSpotifyCurrentAction>;
  item?: Maybe<ModeWaitlistSpotifyCurrentItem>;
};

export enum ModeWaitlistSpotifyCurrentAction {
  Skip = 'SKIP'
}

export type ModeWaitlistSpotifyCurrentItem = {
  __typename?: 'ModeWaitlistSpotifyCurrentItem';
  id: Scalars['String'];
  trackId: Scalars['String'];
  duration: Scalars['Int'];
  cover: Scalars['String'];
  artists: Scalars['String'];
  title: Scalars['String'];
  startedAt?: Maybe<Scalars['String']>;
  author: ModeWaitlistSpotifyCurrentItemAuthor;
};

export type ModeWaitlistSpotifyCurrentItemAuthor = {
  __typename?: 'ModeWaitlistSpotifyCurrentItemAuthor';
  id: Scalars['String'];
  name: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
};

export type ModeWaitlistSpotifyHistory = {
  __typename?: 'ModeWaitlistSpotifyHistory';
  items: Array<ModeWaitlistSpotifyHistoryItem>;
};

export type ModeWaitlistSpotifyHistoryItem = {
  __typename?: 'ModeWaitlistSpotifyHistoryItem';
  actions: Array<ModeWaitlistSpotifyHistoryItemAction>;
  data: ModeWaitlistSpotifyHistoryItemData;
};

export enum ModeWaitlistSpotifyHistoryItemAction {
  AddToQueue = 'ADD_TO_QUEUE'
}

export type ModeWaitlistSpotifyHistoryItemData = {
  __typename?: 'ModeWaitlistSpotifyHistoryItemData';
  id: Scalars['String'];
  trackId: Scalars['String'];
  duration: Scalars['Int'];
  cover: Scalars['String'];
  artists: Scalars['String'];
  title: Scalars['String'];
  startedAt?: Maybe<Scalars['String']>;
  endedAt?: Maybe<Scalars['String']>;
  author: ModeWaitlistSpotifyHistoryItemDataAuthor;
};

export type ModeWaitlistSpotifyHistoryItemDataAuthor = {
  __typename?: 'ModeWaitlistSpotifyHistoryItemDataAuthor';
  id: Scalars['String'];
  name: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
};

export type ModeWaitlistSpotifyQueue = {
  __typename?: 'ModeWaitlistSpotifyQueue';
  actions: Array<ModeWaitlistSpotifyQueueAction>;
  items: Array<ModeWaitlistSpotifyQueueItem>;
};

export enum ModeWaitlistSpotifyQueueAction {
  AddTrack = 'ADD_TRACK'
}

export type ModeWaitlistSpotifyQueueItem = {
  __typename?: 'ModeWaitlistSpotifyQueueItem';
  actions: Array<ModeWaitlistSpotifyQueueItemAction>;
  data: ModeWaitlistSpotifyQueueItemData;
};

export enum ModeWaitlistSpotifyQueueItemAction {
  Cancel = 'CANCEL'
}

export type ModeWaitlistSpotifyQueueItemData = {
  __typename?: 'ModeWaitlistSpotifyQueueItemData';
  id: Scalars['String'];
  trackId: Scalars['String'];
  duration: Scalars['Int'];
  cover: Scalars['String'];
  artists: Scalars['String'];
  title: Scalars['String'];
  author: ModeWaitlistSpotifyQueueItemDataAuthor;
};

export type ModeWaitlistSpotifyQueueItemDataAuthor = {
  __typename?: 'ModeWaitlistSpotifyQueueItemDataAuthor';
  id: Scalars['String'];
  name: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  logout: Scalars['Boolean'];
  updateConnectionStatus: Scalars['Boolean'];
  setUserLocale: Scalars['Boolean'];
  createCommunity: Community;
  createChannel: Channel;
  updateChannel: Channel;
  deleteChannel: Channel;
  setChannelMode: Channel;
  createChannelMessage: Scalars['Boolean'];
  waitlistSpotifyQueueAddTrack: Scalars['Boolean'];
  waitlistSpotifyQueueSkipTrack: Scalars['Boolean'];
  waitlistSpotifyUserSync: Scalars['Boolean'];
  refreshSpotifyToken: Scalars['String'];
  updateTwitchStream: TwitchStream;
};


export type MutationUpdateConnectionStatusArgs = {
  channel?: Maybe<Scalars['String']>;
  community?: Maybe<Scalars['String']>;
};


export type MutationSetUserLocaleArgs = {
  locale: Locale;
};


export type MutationCreateCommunityArgs = {
  input: CreateCommunityInput;
};


export type MutationCreateChannelArgs = {
  input: CreateChannelInput;
};


export type MutationUpdateChannelArgs = {
  input: UpdateChannelInput;
};


export type MutationDeleteChannelArgs = {
  channelId: Scalars['ID'];
};


export type MutationSetChannelModeArgs = {
  input: SetChannelModeInput;
};


export type MutationCreateChannelMessageArgs = {
  input: ChannelMessageCreateInput;
};


export type MutationWaitlistSpotifyQueueAddTrackArgs = {
  trackId: Scalars['String'];
  channelId: Scalars['String'];
};


export type MutationWaitlistSpotifyQueueSkipTrackArgs = {
  channelId: Scalars['String'];
};


export type MutationWaitlistSpotifyUserSyncArgs = {
  channelId: Scalars['String'];
};


export type MutationUpdateTwitchStreamArgs = {
  input: UpdateTwitchStreamInput;
};

export type Profile = {
  __typename?: 'Profile';
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  uniqCount: Scalars['Int'];
  user?: Maybe<User>;
  me: User;
  community: Community;
  communities: Array<Community>;
  channel: Channel;
  channels: Array<Channel>;
  channelMessages: Array<ChannelMessage>;
  waitlistSpotifyHistory: ModeWaitlistSpotifyHistory;
  waitlistSpotifyCurrent: ModeWaitlistSpotifyCurrent;
  waitlistSpotifyQueue: ModeWaitlistSpotifyQueue;
  spotifyNow?: Maybe<SpotifyNow>;
  spotifyToken: Scalars['String'];
  twitchStream: TwitchStream;
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


export type QueryWaitlistSpotifyHistoryArgs = {
  channelId: Scalars['String'];
};


export type QueryWaitlistSpotifyCurrentArgs = {
  channelId: Scalars['String'];
};


export type QueryWaitlistSpotifyQueueArgs = {
  channelId: Scalars['String'];
};


export type QuerySpotifyNowArgs = {
  token: Scalars['String'];
};


export type QueryTwitchStreamArgs = {
  channelId: Scalars['String'];
};

export type SetChannelModeInput = {
  channelId: Scalars['ID'];
  mode: ChannelMode;
};

export type SpotifyNow = {
  __typename?: 'SpotifyNow';
  id: Scalars['String'];
  imageUrl: Scalars['String'];
  artist: Scalars['String'];
  name: Scalars['String'];
  progress: Scalars['Float'];
};

export type Subscription = {
  __typename?: 'Subscription';
  channelMessageCreated: ChannelMessage;
  channelMessageDeleted: ChannelMessage;
  waitlistSpotifyCurrentUpdated: Scalars['Boolean'];
  waitlistSpotifyQueueUpdated: Scalars['Boolean'];
  waitlistSpotifyHistoryUpdated: Scalars['Boolean'];
};


export type SubscriptionChannelMessageCreatedArgs = {
  channelId: Scalars['ID'];
};


export type SubscriptionChannelMessageDeletedArgs = {
  channelId: Scalars['ID'];
};


export type SubscriptionWaitlistSpotifyCurrentUpdatedArgs = {
  channelId: Scalars['String'];
};


export type SubscriptionWaitlistSpotifyQueueUpdatedArgs = {
  channelId: Scalars['String'];
};


export type SubscriptionWaitlistSpotifyHistoryUpdatedArgs = {
  channelId: Scalars['String'];
};

export type TwitchStream = {
  __typename?: 'TwitchStream';
  id: Scalars['String'];
  channelKey?: Maybe<Scalars['String']>;
};

export type UpdateChannelInput = {
  channelId: Scalars['ID'];
  communityId: Scalars['ID'];
  name: Scalars['String'];
  title: Scalars['String'];
};

export type UpdateTwitchStreamInput = {
  channelId: Scalars['ID'];
  channelKey: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  locale: Locale;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  profiles?: Maybe<Array<Profile>>;
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

export type ChannelQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type ChannelQuery = (
  { __typename?: 'Query' }
  & { channel: (
    { __typename?: 'Channel' }
    & ChannelFieldsFragment
  ) }
);

export type CommunityChannelsQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type CommunityChannelsQuery = (
  { __typename?: 'Query' }
  & { channels: Array<(
    { __typename?: 'Channel' }
    & ChannelFieldsFragment
  )> }
);

export type CreateChannelMutationVariables = Exact<{
  input: CreateChannelInput;
}>;


export type CreateChannelMutation = (
  { __typename?: 'Mutation' }
  & { createChannel: (
    { __typename?: 'Channel' }
    & ChannelFieldsFragment
  ) }
);

export type UpdateChannelMutationVariables = Exact<{
  input: UpdateChannelInput;
}>;


export type UpdateChannelMutation = (
  { __typename?: 'Mutation' }
  & { updateChannel: (
    { __typename?: 'Channel' }
    & ChannelFieldsFragment
  ) }
);

export type SetChannelModeMutationVariables = Exact<{
  input: SetChannelModeInput;
}>;


export type SetChannelModeMutation = (
  { __typename?: 'Mutation' }
  & { setChannelMode: (
    { __typename?: 'Channel' }
    & ChannelFieldsFragment
  ) }
);

export type DeleteChannelMutationVariables = Exact<{
  channelId: Scalars['ID'];
}>;


export type DeleteChannelMutation = (
  { __typename?: 'Mutation' }
  & { deleteChannel: (
    { __typename?: 'Channel' }
    & ChannelFieldsFragment
  ) }
);

export type ChannelFieldsFragment = (
  { __typename?: 'Channel' }
  & Pick<Channel, 'id' | 'name' | 'title' | 'mode' | 'state' | 'avatar' | 'onlineCount'>
);

export type CommunityQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type CommunityQuery = (
  { __typename?: 'Query' }
  & { community: (
    { __typename?: 'Community' }
    & CommunityFieldsFragment
  ) }
);

export type CommunitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type CommunitiesQuery = (
  { __typename?: 'Query' }
  & { communities: Array<(
    { __typename?: 'Community' }
    & CommunityFieldsFragment
  )> }
);

export type UniqCountQueryVariables = Exact<{ [key: string]: never; }>;


export type UniqCountQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'uniqCount'>
);

export type CreateCommunityMutationVariables = Exact<{
  input: CreateCommunityInput;
}>;


export type CreateCommunityMutation = (
  { __typename?: 'Mutation' }
  & { createCommunity: (
    { __typename?: 'Community' }
    & CommunityFieldsFragment
  ) }
);

export type CommunityFieldsFragment = (
  { __typename?: 'Community' }
  & Pick<Community, 'id' | 'name' | 'title' | 'avatar' | 'onlineCount'>
);

export type TwitchStreamQueryVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type TwitchStreamQuery = (
  { __typename?: 'Query' }
  & { twitchStream: (
    { __typename?: 'TwitchStream' }
    & TwitchStreamFieldsFragment
  ) }
);

export type UpdateTwitchStreamMutationVariables = Exact<{
  input: UpdateTwitchStreamInput;
}>;


export type UpdateTwitchStreamMutation = (
  { __typename?: 'Mutation' }
  & { updateTwitchStream: (
    { __typename?: 'TwitchStream' }
    & TwitchStreamFieldsFragment
  ) }
);

export type TwitchStreamFieldsFragment = (
  { __typename?: 'TwitchStream' }
  & Pick<TwitchStream, 'id' | 'channelKey'>
);

export type WaitlistSpotifyHistoryQueryVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type WaitlistSpotifyHistoryQuery = (
  { __typename?: 'Query' }
  & { waitlistSpotifyHistory: (
    { __typename?: 'ModeWaitlistSpotifyHistory' }
    & { items: Array<(
      { __typename?: 'ModeWaitlistSpotifyHistoryItem' }
      & Pick<ModeWaitlistSpotifyHistoryItem, 'actions'>
      & { data: (
        { __typename?: 'ModeWaitlistSpotifyHistoryItemData' }
        & Pick<ModeWaitlistSpotifyHistoryItemData, 'id' | 'trackId' | 'duration' | 'cover' | 'artists' | 'title' | 'startedAt' | 'endedAt'>
        & { author: (
          { __typename?: 'ModeWaitlistSpotifyHistoryItemDataAuthor' }
          & Pick<ModeWaitlistSpotifyHistoryItemDataAuthor, 'id' | 'name' | 'avatar'>
        ) }
      ) }
    )> }
  ) }
);

export type WaitlistSpotifyHistoryUpdatedSubscriptionVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type WaitlistSpotifyHistoryUpdatedSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'waitlistSpotifyHistoryUpdated'>
);

export type WaitlistSpotifyCurrentQueryVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type WaitlistSpotifyCurrentQuery = (
  { __typename?: 'Query' }
  & { waitlistSpotifyCurrent: (
    { __typename?: 'ModeWaitlistSpotifyCurrent' }
    & Pick<ModeWaitlistSpotifyCurrent, 'actions'>
    & { item?: Maybe<(
      { __typename?: 'ModeWaitlistSpotifyCurrentItem' }
      & Pick<ModeWaitlistSpotifyCurrentItem, 'id' | 'trackId' | 'duration' | 'cover' | 'artists' | 'title' | 'startedAt'>
      & { author: (
        { __typename?: 'ModeWaitlistSpotifyCurrentItemAuthor' }
        & Pick<ModeWaitlistSpotifyCurrentItemAuthor, 'id' | 'name' | 'avatar'>
      ) }
    )> }
  ) }
);

export type WaitlistSpotifyCurrentUpdatedSubscriptionVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type WaitlistSpotifyCurrentUpdatedSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'waitlistSpotifyCurrentUpdated'>
);

export type WaitlistSpotifyQueueQueryVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type WaitlistSpotifyQueueQuery = (
  { __typename?: 'Query' }
  & { waitlistSpotifyQueue: (
    { __typename?: 'ModeWaitlistSpotifyQueue' }
    & Pick<ModeWaitlistSpotifyQueue, 'actions'>
    & { items: Array<(
      { __typename?: 'ModeWaitlistSpotifyQueueItem' }
      & Pick<ModeWaitlistSpotifyQueueItem, 'actions'>
      & { data: (
        { __typename?: 'ModeWaitlistSpotifyQueueItemData' }
        & Pick<ModeWaitlistSpotifyQueueItemData, 'id' | 'trackId' | 'duration' | 'cover' | 'artists' | 'title'>
        & { author: (
          { __typename?: 'ModeWaitlistSpotifyQueueItemDataAuthor' }
          & Pick<ModeWaitlistSpotifyQueueItemDataAuthor, 'id' | 'name' | 'avatar'>
        ) }
      ) }
    )> }
  ) }
);

export type WaitlistSpotifyQueueUpdatedSubscriptionVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type WaitlistSpotifyQueueUpdatedSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'waitlistSpotifyQueueUpdated'>
);

export type WaitlistSpotifyQueueAddTrackMutationVariables = Exact<{
  channelId: Scalars['String'];
  trackId: Scalars['String'];
}>;


export type WaitlistSpotifyQueueAddTrackMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'waitlistSpotifyQueueAddTrack'>
);

export type WaitlistSpotifyQueueSkipTrackMutationVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type WaitlistSpotifyQueueSkipTrackMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'waitlistSpotifyQueueSkipTrack'>
);

export type WaitlistSpotifyUserSyncMutationVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type WaitlistSpotifyUserSyncMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'waitlistSpotifyUserSync'>
);

export type SpotifyNowQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type SpotifyNowQuery = (
  { __typename?: 'Query' }
  & { spotifyNow?: Maybe<(
    { __typename?: 'SpotifyNow' }
    & Pick<SpotifyNow, 'id' | 'imageUrl' | 'artist' | 'name' | 'progress'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'avatar' | 'locale'>
    & { profiles?: Maybe<Array<(
      { __typename?: 'Profile' }
      & Pick<Profile, 'id' | 'provider'>
    )>> }
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

export type SetUserLocaleMutationVariables = Exact<{
  locale: Locale;
}>;


export type SetUserLocaleMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setUserLocale'>
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
export const ChannelFieldsFragmentDoc = gql`
    fragment ChannelFields on Channel {
  id
  name
  title
  mode
  state
  avatar
  onlineCount
}
    `;
export const CommunityFieldsFragmentDoc = gql`
    fragment CommunityFields on Community {
  id
  name
  title
  avatar
  onlineCount
}
    `;
export const TwitchStreamFieldsFragmentDoc = gql`
    fragment TwitchStreamFields on TwitchStream {
  id
  channelKey
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChannelMessagesQuery, ChannelMessagesQueryVariables>(ChannelMessagesDocument, options);
      }
export function useChannelMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChannelMessagesQuery, ChannelMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChannelMessagesQuery, ChannelMessagesQueryVariables>(ChannelMessagesDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChannelMessageMutation, CreateChannelMessageMutationVariables>(CreateChannelMessageDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ChannelMessageCreatedSubscription, ChannelMessageCreatedSubscriptionVariables>(ChannelMessageCreatedDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ChannelMessageDeletedSubscription, ChannelMessageDeletedSubscriptionVariables>(ChannelMessageDeletedDocument, options);
      }
export type ChannelMessageDeletedSubscriptionHookResult = ReturnType<typeof useChannelMessageDeletedSubscription>;
export type ChannelMessageDeletedSubscriptionResult = Apollo.SubscriptionResult<ChannelMessageDeletedSubscription>;
export const ChannelDocument = gql`
    query channel($name: String!) {
  channel(name: $name) {
    ...ChannelFields
  }
}
    ${ChannelFieldsFragmentDoc}`;

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
 *   },
 * });
 */
export function useChannelQuery(baseOptions: Apollo.QueryHookOptions<ChannelQuery, ChannelQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChannelQuery, ChannelQueryVariables>(ChannelDocument, options);
      }
export function useChannelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChannelQuery, ChannelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChannelQuery, ChannelQueryVariables>(ChannelDocument, options);
        }
export type ChannelQueryHookResult = ReturnType<typeof useChannelQuery>;
export type ChannelLazyQueryHookResult = ReturnType<typeof useChannelLazyQuery>;
export type ChannelQueryResult = Apollo.QueryResult<ChannelQuery, ChannelQueryVariables>;
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
export const CreateChannelDocument = gql`
    mutation createChannel($input: CreateChannelInput!) {
  createChannel(input: $input) {
    ...ChannelFields
  }
}
    ${ChannelFieldsFragmentDoc}`;
export type CreateChannelMutationFn = Apollo.MutationFunction<CreateChannelMutation, CreateChannelMutationVariables>;

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
export function useCreateChannelMutation(baseOptions?: Apollo.MutationHookOptions<CreateChannelMutation, CreateChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChannelMutation, CreateChannelMutationVariables>(CreateChannelDocument, options);
      }
export type CreateChannelMutationHookResult = ReturnType<typeof useCreateChannelMutation>;
export type CreateChannelMutationResult = Apollo.MutationResult<CreateChannelMutation>;
export type CreateChannelMutationOptions = Apollo.BaseMutationOptions<CreateChannelMutation, CreateChannelMutationVariables>;
export const UpdateChannelDocument = gql`
    mutation updateChannel($input: UpdateChannelInput!) {
  updateChannel(input: $input) {
    ...ChannelFields
  }
}
    ${ChannelFieldsFragmentDoc}`;
export type UpdateChannelMutationFn = Apollo.MutationFunction<UpdateChannelMutation, UpdateChannelMutationVariables>;

/**
 * __useUpdateChannelMutation__
 *
 * To run a mutation, you first call `useUpdateChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChannelMutation, { data, loading, error }] = useUpdateChannelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateChannelMutation(baseOptions?: Apollo.MutationHookOptions<UpdateChannelMutation, UpdateChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateChannelMutation, UpdateChannelMutationVariables>(UpdateChannelDocument, options);
      }
export type UpdateChannelMutationHookResult = ReturnType<typeof useUpdateChannelMutation>;
export type UpdateChannelMutationResult = Apollo.MutationResult<UpdateChannelMutation>;
export type UpdateChannelMutationOptions = Apollo.BaseMutationOptions<UpdateChannelMutation, UpdateChannelMutationVariables>;
export const SetChannelModeDocument = gql`
    mutation setChannelMode($input: SetChannelModeInput!) {
  setChannelMode(input: $input) {
    ...ChannelFields
  }
}
    ${ChannelFieldsFragmentDoc}`;
export type SetChannelModeMutationFn = Apollo.MutationFunction<SetChannelModeMutation, SetChannelModeMutationVariables>;

/**
 * __useSetChannelModeMutation__
 *
 * To run a mutation, you first call `useSetChannelModeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetChannelModeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setChannelModeMutation, { data, loading, error }] = useSetChannelModeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetChannelModeMutation(baseOptions?: Apollo.MutationHookOptions<SetChannelModeMutation, SetChannelModeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetChannelModeMutation, SetChannelModeMutationVariables>(SetChannelModeDocument, options);
      }
export type SetChannelModeMutationHookResult = ReturnType<typeof useSetChannelModeMutation>;
export type SetChannelModeMutationResult = Apollo.MutationResult<SetChannelModeMutation>;
export type SetChannelModeMutationOptions = Apollo.BaseMutationOptions<SetChannelModeMutation, SetChannelModeMutationVariables>;
export const DeleteChannelDocument = gql`
    mutation deleteChannel($channelId: ID!) {
  deleteChannel(channelId: $channelId) {
    ...ChannelFields
  }
}
    ${ChannelFieldsFragmentDoc}`;
export type DeleteChannelMutationFn = Apollo.MutationFunction<DeleteChannelMutation, DeleteChannelMutationVariables>;

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
export function useDeleteChannelMutation(baseOptions?: Apollo.MutationHookOptions<DeleteChannelMutation, DeleteChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteChannelMutation, DeleteChannelMutationVariables>(DeleteChannelDocument, options);
      }
export type DeleteChannelMutationHookResult = ReturnType<typeof useDeleteChannelMutation>;
export type DeleteChannelMutationResult = Apollo.MutationResult<DeleteChannelMutation>;
export type DeleteChannelMutationOptions = Apollo.BaseMutationOptions<DeleteChannelMutation, DeleteChannelMutationVariables>;
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
export const WaitlistSpotifyHistoryDocument = gql`
    query waitlistSpotifyHistory($channelId: String!) {
  waitlistSpotifyHistory(channelId: $channelId) {
    items {
      data {
        id
        trackId
        duration
        cover
        artists
        title
        startedAt
        endedAt
        author {
          id
          name
          avatar
        }
      }
      actions
    }
  }
}
    `;

/**
 * __useWaitlistSpotifyHistoryQuery__
 *
 * To run a query within a React component, call `useWaitlistSpotifyHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useWaitlistSpotifyHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWaitlistSpotifyHistoryQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useWaitlistSpotifyHistoryQuery(baseOptions: Apollo.QueryHookOptions<WaitlistSpotifyHistoryQuery, WaitlistSpotifyHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WaitlistSpotifyHistoryQuery, WaitlistSpotifyHistoryQueryVariables>(WaitlistSpotifyHistoryDocument, options);
      }
export function useWaitlistSpotifyHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WaitlistSpotifyHistoryQuery, WaitlistSpotifyHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WaitlistSpotifyHistoryQuery, WaitlistSpotifyHistoryQueryVariables>(WaitlistSpotifyHistoryDocument, options);
        }
export type WaitlistSpotifyHistoryQueryHookResult = ReturnType<typeof useWaitlistSpotifyHistoryQuery>;
export type WaitlistSpotifyHistoryLazyQueryHookResult = ReturnType<typeof useWaitlistSpotifyHistoryLazyQuery>;
export type WaitlistSpotifyHistoryQueryResult = Apollo.QueryResult<WaitlistSpotifyHistoryQuery, WaitlistSpotifyHistoryQueryVariables>;
export const WaitlistSpotifyHistoryUpdatedDocument = gql`
    subscription waitlistSpotifyHistoryUpdated($channelId: String!) {
  waitlistSpotifyHistoryUpdated(channelId: $channelId)
}
    `;

/**
 * __useWaitlistSpotifyHistoryUpdatedSubscription__
 *
 * To run a query within a React component, call `useWaitlistSpotifyHistoryUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useWaitlistSpotifyHistoryUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWaitlistSpotifyHistoryUpdatedSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useWaitlistSpotifyHistoryUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<WaitlistSpotifyHistoryUpdatedSubscription, WaitlistSpotifyHistoryUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<WaitlistSpotifyHistoryUpdatedSubscription, WaitlistSpotifyHistoryUpdatedSubscriptionVariables>(WaitlistSpotifyHistoryUpdatedDocument, options);
      }
export type WaitlistSpotifyHistoryUpdatedSubscriptionHookResult = ReturnType<typeof useWaitlistSpotifyHistoryUpdatedSubscription>;
export type WaitlistSpotifyHistoryUpdatedSubscriptionResult = Apollo.SubscriptionResult<WaitlistSpotifyHistoryUpdatedSubscription>;
export const WaitlistSpotifyCurrentDocument = gql`
    query waitlistSpotifyCurrent($channelId: String!) {
  waitlistSpotifyCurrent(channelId: $channelId) {
    item {
      id
      trackId
      duration
      cover
      artists
      title
      startedAt
      author {
        id
        name
        avatar
      }
    }
    actions
  }
}
    `;

/**
 * __useWaitlistSpotifyCurrentQuery__
 *
 * To run a query within a React component, call `useWaitlistSpotifyCurrentQuery` and pass it any options that fit your needs.
 * When your component renders, `useWaitlistSpotifyCurrentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWaitlistSpotifyCurrentQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useWaitlistSpotifyCurrentQuery(baseOptions: Apollo.QueryHookOptions<WaitlistSpotifyCurrentQuery, WaitlistSpotifyCurrentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WaitlistSpotifyCurrentQuery, WaitlistSpotifyCurrentQueryVariables>(WaitlistSpotifyCurrentDocument, options);
      }
export function useWaitlistSpotifyCurrentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WaitlistSpotifyCurrentQuery, WaitlistSpotifyCurrentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WaitlistSpotifyCurrentQuery, WaitlistSpotifyCurrentQueryVariables>(WaitlistSpotifyCurrentDocument, options);
        }
export type WaitlistSpotifyCurrentQueryHookResult = ReturnType<typeof useWaitlistSpotifyCurrentQuery>;
export type WaitlistSpotifyCurrentLazyQueryHookResult = ReturnType<typeof useWaitlistSpotifyCurrentLazyQuery>;
export type WaitlistSpotifyCurrentQueryResult = Apollo.QueryResult<WaitlistSpotifyCurrentQuery, WaitlistSpotifyCurrentQueryVariables>;
export const WaitlistSpotifyCurrentUpdatedDocument = gql`
    subscription waitlistSpotifyCurrentUpdated($channelId: String!) {
  waitlistSpotifyCurrentUpdated(channelId: $channelId)
}
    `;

/**
 * __useWaitlistSpotifyCurrentUpdatedSubscription__
 *
 * To run a query within a React component, call `useWaitlistSpotifyCurrentUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useWaitlistSpotifyCurrentUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWaitlistSpotifyCurrentUpdatedSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useWaitlistSpotifyCurrentUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<WaitlistSpotifyCurrentUpdatedSubscription, WaitlistSpotifyCurrentUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<WaitlistSpotifyCurrentUpdatedSubscription, WaitlistSpotifyCurrentUpdatedSubscriptionVariables>(WaitlistSpotifyCurrentUpdatedDocument, options);
      }
export type WaitlistSpotifyCurrentUpdatedSubscriptionHookResult = ReturnType<typeof useWaitlistSpotifyCurrentUpdatedSubscription>;
export type WaitlistSpotifyCurrentUpdatedSubscriptionResult = Apollo.SubscriptionResult<WaitlistSpotifyCurrentUpdatedSubscription>;
export const WaitlistSpotifyQueueDocument = gql`
    query waitlistSpotifyQueue($channelId: String!) {
  waitlistSpotifyQueue(channelId: $channelId) {
    items {
      data {
        id
        trackId
        duration
        cover
        artists
        title
        author {
          id
          name
          avatar
        }
      }
      actions
    }
    actions
  }
}
    `;

/**
 * __useWaitlistSpotifyQueueQuery__
 *
 * To run a query within a React component, call `useWaitlistSpotifyQueueQuery` and pass it any options that fit your needs.
 * When your component renders, `useWaitlistSpotifyQueueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWaitlistSpotifyQueueQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useWaitlistSpotifyQueueQuery(baseOptions: Apollo.QueryHookOptions<WaitlistSpotifyQueueQuery, WaitlistSpotifyQueueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WaitlistSpotifyQueueQuery, WaitlistSpotifyQueueQueryVariables>(WaitlistSpotifyQueueDocument, options);
      }
export function useWaitlistSpotifyQueueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WaitlistSpotifyQueueQuery, WaitlistSpotifyQueueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WaitlistSpotifyQueueQuery, WaitlistSpotifyQueueQueryVariables>(WaitlistSpotifyQueueDocument, options);
        }
export type WaitlistSpotifyQueueQueryHookResult = ReturnType<typeof useWaitlistSpotifyQueueQuery>;
export type WaitlistSpotifyQueueLazyQueryHookResult = ReturnType<typeof useWaitlistSpotifyQueueLazyQuery>;
export type WaitlistSpotifyQueueQueryResult = Apollo.QueryResult<WaitlistSpotifyQueueQuery, WaitlistSpotifyQueueQueryVariables>;
export const WaitlistSpotifyQueueUpdatedDocument = gql`
    subscription waitlistSpotifyQueueUpdated($channelId: String!) {
  waitlistSpotifyQueueUpdated(channelId: $channelId)
}
    `;

/**
 * __useWaitlistSpotifyQueueUpdatedSubscription__
 *
 * To run a query within a React component, call `useWaitlistSpotifyQueueUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useWaitlistSpotifyQueueUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWaitlistSpotifyQueueUpdatedSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useWaitlistSpotifyQueueUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<WaitlistSpotifyQueueUpdatedSubscription, WaitlistSpotifyQueueUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<WaitlistSpotifyQueueUpdatedSubscription, WaitlistSpotifyQueueUpdatedSubscriptionVariables>(WaitlistSpotifyQueueUpdatedDocument, options);
      }
export type WaitlistSpotifyQueueUpdatedSubscriptionHookResult = ReturnType<typeof useWaitlistSpotifyQueueUpdatedSubscription>;
export type WaitlistSpotifyQueueUpdatedSubscriptionResult = Apollo.SubscriptionResult<WaitlistSpotifyQueueUpdatedSubscription>;
export const WaitlistSpotifyQueueAddTrackDocument = gql`
    mutation waitlistSpotifyQueueAddTrack($channelId: String!, $trackId: String!) {
  waitlistSpotifyQueueAddTrack(channelId: $channelId, trackId: $trackId)
}
    `;
export type WaitlistSpotifyQueueAddTrackMutationFn = Apollo.MutationFunction<WaitlistSpotifyQueueAddTrackMutation, WaitlistSpotifyQueueAddTrackMutationVariables>;

/**
 * __useWaitlistSpotifyQueueAddTrackMutation__
 *
 * To run a mutation, you first call `useWaitlistSpotifyQueueAddTrackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWaitlistSpotifyQueueAddTrackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [waitlistSpotifyQueueAddTrackMutation, { data, loading, error }] = useWaitlistSpotifyQueueAddTrackMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      trackId: // value for 'trackId'
 *   },
 * });
 */
export function useWaitlistSpotifyQueueAddTrackMutation(baseOptions?: Apollo.MutationHookOptions<WaitlistSpotifyQueueAddTrackMutation, WaitlistSpotifyQueueAddTrackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<WaitlistSpotifyQueueAddTrackMutation, WaitlistSpotifyQueueAddTrackMutationVariables>(WaitlistSpotifyQueueAddTrackDocument, options);
      }
export type WaitlistSpotifyQueueAddTrackMutationHookResult = ReturnType<typeof useWaitlistSpotifyQueueAddTrackMutation>;
export type WaitlistSpotifyQueueAddTrackMutationResult = Apollo.MutationResult<WaitlistSpotifyQueueAddTrackMutation>;
export type WaitlistSpotifyQueueAddTrackMutationOptions = Apollo.BaseMutationOptions<WaitlistSpotifyQueueAddTrackMutation, WaitlistSpotifyQueueAddTrackMutationVariables>;
export const WaitlistSpotifyQueueSkipTrackDocument = gql`
    mutation waitlistSpotifyQueueSkipTrack($channelId: String!) {
  waitlistSpotifyQueueSkipTrack(channelId: $channelId)
}
    `;
export type WaitlistSpotifyQueueSkipTrackMutationFn = Apollo.MutationFunction<WaitlistSpotifyQueueSkipTrackMutation, WaitlistSpotifyQueueSkipTrackMutationVariables>;

/**
 * __useWaitlistSpotifyQueueSkipTrackMutation__
 *
 * To run a mutation, you first call `useWaitlistSpotifyQueueSkipTrackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWaitlistSpotifyQueueSkipTrackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [waitlistSpotifyQueueSkipTrackMutation, { data, loading, error }] = useWaitlistSpotifyQueueSkipTrackMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useWaitlistSpotifyQueueSkipTrackMutation(baseOptions?: Apollo.MutationHookOptions<WaitlistSpotifyQueueSkipTrackMutation, WaitlistSpotifyQueueSkipTrackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<WaitlistSpotifyQueueSkipTrackMutation, WaitlistSpotifyQueueSkipTrackMutationVariables>(WaitlistSpotifyQueueSkipTrackDocument, options);
      }
export type WaitlistSpotifyQueueSkipTrackMutationHookResult = ReturnType<typeof useWaitlistSpotifyQueueSkipTrackMutation>;
export type WaitlistSpotifyQueueSkipTrackMutationResult = Apollo.MutationResult<WaitlistSpotifyQueueSkipTrackMutation>;
export type WaitlistSpotifyQueueSkipTrackMutationOptions = Apollo.BaseMutationOptions<WaitlistSpotifyQueueSkipTrackMutation, WaitlistSpotifyQueueSkipTrackMutationVariables>;
export const WaitlistSpotifyUserSyncDocument = gql`
    mutation waitlistSpotifyUserSync($channelId: String!) {
  waitlistSpotifyUserSync(channelId: $channelId)
}
    `;
export type WaitlistSpotifyUserSyncMutationFn = Apollo.MutationFunction<WaitlistSpotifyUserSyncMutation, WaitlistSpotifyUserSyncMutationVariables>;

/**
 * __useWaitlistSpotifyUserSyncMutation__
 *
 * To run a mutation, you first call `useWaitlistSpotifyUserSyncMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWaitlistSpotifyUserSyncMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [waitlistSpotifyUserSyncMutation, { data, loading, error }] = useWaitlistSpotifyUserSyncMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useWaitlistSpotifyUserSyncMutation(baseOptions?: Apollo.MutationHookOptions<WaitlistSpotifyUserSyncMutation, WaitlistSpotifyUserSyncMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<WaitlistSpotifyUserSyncMutation, WaitlistSpotifyUserSyncMutationVariables>(WaitlistSpotifyUserSyncDocument, options);
      }
export type WaitlistSpotifyUserSyncMutationHookResult = ReturnType<typeof useWaitlistSpotifyUserSyncMutation>;
export type WaitlistSpotifyUserSyncMutationResult = Apollo.MutationResult<WaitlistSpotifyUserSyncMutation>;
export type WaitlistSpotifyUserSyncMutationOptions = Apollo.BaseMutationOptions<WaitlistSpotifyUserSyncMutation, WaitlistSpotifyUserSyncMutationVariables>;
export const SpotifyNowDocument = gql`
    query spotifyNow($token: String!) {
  spotifyNow(token: $token) {
    id
    imageUrl
    artist
    name
    progress
  }
}
    `;

/**
 * __useSpotifyNowQuery__
 *
 * To run a query within a React component, call `useSpotifyNowQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpotifyNowQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpotifyNowQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useSpotifyNowQuery(baseOptions: Apollo.QueryHookOptions<SpotifyNowQuery, SpotifyNowQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SpotifyNowQuery, SpotifyNowQueryVariables>(SpotifyNowDocument, options);
      }
export function useSpotifyNowLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SpotifyNowQuery, SpotifyNowQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SpotifyNowQuery, SpotifyNowQueryVariables>(SpotifyNowDocument, options);
        }
export type SpotifyNowQueryHookResult = ReturnType<typeof useSpotifyNowQuery>;
export type SpotifyNowLazyQueryHookResult = ReturnType<typeof useSpotifyNowLazyQuery>;
export type SpotifyNowQueryResult = Apollo.QueryResult<SpotifyNowQuery, SpotifyNowQueryVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateConnectionStatusMutation, UpdateConnectionStatusMutationVariables>(UpdateConnectionStatusDocument, options);
      }
export type UpdateConnectionStatusMutationHookResult = ReturnType<typeof useUpdateConnectionStatusMutation>;
export type UpdateConnectionStatusMutationResult = Apollo.MutationResult<UpdateConnectionStatusMutation>;
export type UpdateConnectionStatusMutationOptions = Apollo.BaseMutationOptions<UpdateConnectionStatusMutation, UpdateConnectionStatusMutationVariables>;
export const SetUserLocaleDocument = gql`
    mutation setUserLocale($locale: Locale!) {
  setUserLocale(locale: $locale)
}
    `;
export type SetUserLocaleMutationFn = Apollo.MutationFunction<SetUserLocaleMutation, SetUserLocaleMutationVariables>;

/**
 * __useSetUserLocaleMutation__
 *
 * To run a mutation, you first call `useSetUserLocaleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUserLocaleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUserLocaleMutation, { data, loading, error }] = useSetUserLocaleMutation({
 *   variables: {
 *      locale: // value for 'locale'
 *   },
 * });
 */
export function useSetUserLocaleMutation(baseOptions?: Apollo.MutationHookOptions<SetUserLocaleMutation, SetUserLocaleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetUserLocaleMutation, SetUserLocaleMutationVariables>(SetUserLocaleDocument, options);
      }
export type SetUserLocaleMutationHookResult = ReturnType<typeof useSetUserLocaleMutation>;
export type SetUserLocaleMutationResult = Apollo.MutationResult<SetUserLocaleMutation>;
export type SetUserLocaleMutationOptions = Apollo.BaseMutationOptions<SetUserLocaleMutation, SetUserLocaleMutationVariables>;