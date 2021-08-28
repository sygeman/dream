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
  gifAllowed: Scalars['Boolean'];
  nsfw: Scalars['Boolean'];
  slowmode: Scalars['Int'];
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
  tenorGif?: Maybe<TenorGif>;
};

export type ChannelMessageCreateInput = {
  content: Scalars['String'];
  channelId: Scalars['String'];
};

export enum ChannelMode {
  None = 'NONE',
  Twitch = 'TWITCH',
  Youtube = 'YOUTUBE',
  Spotify = 'SPOTIFY'
}

export type Community = {
  __typename?: 'Community';
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
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


export type Emoji = {
  __typename?: 'Emoji';
  id: Scalars['String'];
  alias: Scalars['String'];
  communityId: Scalars['String'];
  authorId: Scalars['String'];
  author: User;
  createdAt: Scalars['String'];
};

export enum Locale {
  EnUs = 'en_US',
  RuRu = 'ru_RU'
}

export type Mutation = {
  __typename?: 'Mutation';
  logout: Scalars['Boolean'];
  updateConnectionStatus: Scalars['Boolean'];
  setUserLocale: Locale;
  createCommunity: Community;
  updateCommunity: Community;
  deleteCommunity: Community;
  createChannel: Channel;
  updateChannel: Channel;
  deleteChannel: Channel;
  createChannelMessage: Scalars['Boolean'];
  updateSpotifyMode: SpotifyMode;
  makeSpotifyModeCurrent: Scalars['Boolean'];
  spotifyModeQueueAddTrack: Scalars['Boolean'];
  spotifyModeQueueSkipTrack: Scalars['Boolean'];
  spotifyModeUserSync: Scalars['Boolean'];
  refreshSpotifyToken: Scalars['String'];
  makeTwitchStreamModeCurrent: Scalars['Boolean'];
  updateTwitchStream: TwitchStream;
  makeWaitlistYoutubeModeCurrent: Scalars['Boolean'];
  waitlistYoutubeQueueAddVideo: Scalars['Boolean'];
  waitlistYoutubeQueueSkipVideo: Scalars['Boolean'];
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


export type MutationUpdateCommunityArgs = {
  input: UpdateCommunityInput;
};


export type MutationDeleteCommunityArgs = {
  communityId: Scalars['ID'];
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


export type MutationCreateChannelMessageArgs = {
  input: ChannelMessageCreateInput;
};


export type MutationUpdateSpotifyModeArgs = {
  input: UpdateSpotifyModeInput;
};


export type MutationMakeSpotifyModeCurrentArgs = {
  channelId: Scalars['String'];
};


export type MutationSpotifyModeQueueAddTrackArgs = {
  trackId: Scalars['String'];
  channelId: Scalars['String'];
};


export type MutationSpotifyModeQueueSkipTrackArgs = {
  channelId: Scalars['String'];
};


export type MutationSpotifyModeUserSyncArgs = {
  channelId: Scalars['String'];
};


export type MutationMakeTwitchStreamModeCurrentArgs = {
  channelId: Scalars['String'];
};


export type MutationUpdateTwitchStreamArgs = {
  input: UpdateTwitchStreamInput;
};


export type MutationMakeWaitlistYoutubeModeCurrentArgs = {
  channelId: Scalars['String'];
};


export type MutationWaitlistYoutubeQueueAddVideoArgs = {
  videoId: Scalars['String'];
  channelId: Scalars['String'];
};


export type MutationWaitlistYoutubeQueueSkipVideoArgs = {
  channelId: Scalars['String'];
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
  channelUsersOnline: Array<User>;
  channels: Array<Channel>;
  channelMessages: Array<ChannelMessage>;
  emojis: Array<Emoji>;
  spotifyMode: SpotifyMode;
  spotifyModeHistory: SpotifyModeHistory;
  spotifyModeCurrent?: Maybe<SpotifyModeCurrent>;
  spotifyModeQueue: SpotifyModeQueue;
  spotifyNow?: Maybe<SpotifyNow>;
  spotifyToken: Scalars['String'];
  twitchStream: TwitchStream;
  waitlistYoutubeHistory: YoutubeModeHistory;
  waitlistYoutubeCurrent?: Maybe<YoutubeModeCurrent>;
  waitlistYoutubeQueue: YoutubeModeQueue;
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryCommunityArgs = {
  name: Scalars['String'];
};


export type QueryChannelArgs = {
  communityId: Scalars['String'];
  name: Scalars['String'];
};


export type QueryChannelUsersOnlineArgs = {
  channelId: Scalars['String'];
};


export type QueryChannelsArgs = {
  name: Scalars['String'];
};


export type QueryChannelMessagesArgs = {
  channelId: Scalars['ID'];
};


export type QueryEmojisArgs = {
  communityId: Scalars['String'];
};


export type QuerySpotifyModeArgs = {
  channelId: Scalars['String'];
};


export type QuerySpotifyModeHistoryArgs = {
  channelId: Scalars['String'];
};


export type QuerySpotifyModeCurrentArgs = {
  channelId: Scalars['String'];
};


export type QuerySpotifyModeQueueArgs = {
  channelId: Scalars['String'];
};


export type QuerySpotifyNowArgs = {
  userId: Scalars['String'];
};


export type QueryTwitchStreamArgs = {
  channelId: Scalars['String'];
};


export type QueryWaitlistYoutubeHistoryArgs = {
  channelId: Scalars['String'];
};


export type QueryWaitlistYoutubeCurrentArgs = {
  channelId: Scalars['String'];
};


export type QueryWaitlistYoutubeQueueArgs = {
  channelId: Scalars['String'];
};

export type SpotifyMode = {
  __typename?: 'SpotifyMode';
  id: Scalars['String'];
  hostId?: Maybe<Scalars['String']>;
  strategy: SpotifyModeStrategy;
};

export type SpotifyModeCurrent = {
  __typename?: 'SpotifyModeCurrent';
  actions: Array<SpotifyModeCurrentAction>;
  item?: Maybe<SpotifyModeCurrentItem>;
};

export enum SpotifyModeCurrentAction {
  Skip = 'SKIP'
}

export type SpotifyModeCurrentItem = {
  __typename?: 'SpotifyModeCurrentItem';
  id: Scalars['String'];
  trackId: Scalars['String'];
  duration: Scalars['Int'];
  start: Scalars['Int'];
  end: Scalars['Int'];
  cover: Scalars['String'];
  artists: Scalars['String'];
  title: Scalars['String'];
  startedAt?: Maybe<Scalars['String']>;
  author: SpotifyModeCurrentItemAuthor;
};

export type SpotifyModeCurrentItemAuthor = {
  __typename?: 'SpotifyModeCurrentItemAuthor';
  id: Scalars['String'];
  name: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
};

export type SpotifyModeHistory = {
  __typename?: 'SpotifyModeHistory';
  items: Array<SpotifyModeHistoryItem>;
};

export type SpotifyModeHistoryItem = {
  __typename?: 'SpotifyModeHistoryItem';
  actions: Array<SpotifyModeHistoryItemAction>;
  data: SpotifyModeHistoryItemData;
};

export enum SpotifyModeHistoryItemAction {
  AddToQueue = 'ADD_TO_QUEUE'
}

export type SpotifyModeHistoryItemData = {
  __typename?: 'SpotifyModeHistoryItemData';
  id: Scalars['String'];
  trackId: Scalars['String'];
  duration: Scalars['Int'];
  cover: Scalars['String'];
  artists: Scalars['String'];
  title: Scalars['String'];
  startedAt?: Maybe<Scalars['String']>;
  endedAt?: Maybe<Scalars['String']>;
  author: SpotifyModeHistoryItemDataAuthor;
};

export type SpotifyModeHistoryItemDataAuthor = {
  __typename?: 'SpotifyModeHistoryItemDataAuthor';
  id: Scalars['String'];
  name: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
};

export type SpotifyModeQueue = {
  __typename?: 'SpotifyModeQueue';
  actions: Array<SpotifyModeQueueAction>;
  items: Array<SpotifyModeQueueItem>;
};

export enum SpotifyModeQueueAction {
  AddTrack = 'ADD_TRACK'
}

export type SpotifyModeQueueItem = {
  __typename?: 'SpotifyModeQueueItem';
  actions: Array<SpotifyModeQueueItemAction>;
  data: SpotifyModeQueueItemData;
};

export enum SpotifyModeQueueItemAction {
  Cancel = 'CANCEL'
}

export type SpotifyModeQueueItemData = {
  __typename?: 'SpotifyModeQueueItemData';
  id: Scalars['String'];
  trackId: Scalars['String'];
  duration: Scalars['Int'];
  cover: Scalars['String'];
  artists: Scalars['String'];
  title: Scalars['String'];
  author: SpotifyModeQueueItemDataAuthor;
};

export type SpotifyModeQueueItemDataAuthor = {
  __typename?: 'SpotifyModeQueueItemDataAuthor';
  id: Scalars['String'];
  name: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
};

export enum SpotifyModeStrategy {
  Queue = 'QUEUE',
  Host = 'HOST'
}

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
  spotifyModeCurrentUpdated: Scalars['Boolean'];
  spotifyModeQueueUpdated: Scalars['Boolean'];
  spotifyModeHistoryUpdated: Scalars['Boolean'];
  waitlistYoutubeCurrentUpdated: Scalars['Boolean'];
  waitlistYoutubeQueueUpdated: Scalars['Boolean'];
  waitlistYoutubeHistoryUpdated: Scalars['Boolean'];
};


export type SubscriptionChannelMessageCreatedArgs = {
  channelId: Scalars['ID'];
};


export type SubscriptionChannelMessageDeletedArgs = {
  channelId: Scalars['ID'];
};


export type SubscriptionSpotifyModeCurrentUpdatedArgs = {
  channelId: Scalars['String'];
};


export type SubscriptionSpotifyModeQueueUpdatedArgs = {
  channelId: Scalars['String'];
};


export type SubscriptionSpotifyModeHistoryUpdatedArgs = {
  channelId: Scalars['String'];
};


export type SubscriptionWaitlistYoutubeCurrentUpdatedArgs = {
  channelId: Scalars['String'];
};


export type SubscriptionWaitlistYoutubeQueueUpdatedArgs = {
  channelId: Scalars['String'];
};


export type SubscriptionWaitlistYoutubeHistoryUpdatedArgs = {
  channelId: Scalars['String'];
};

export type TenorGif = {
  __typename?: 'TenorGif';
  id: Scalars['String'];
  height: Scalars['Float'];
  width: Scalars['Float'];
  preview: Scalars['String'];
  video: Scalars['String'];
};

export type TwitchStream = {
  __typename?: 'TwitchStream';
  id: Scalars['String'];
  channelKey?: Maybe<Scalars['String']>;
};

export type UpdateChannelInput = {
  channelId: Scalars['ID'];
  communityId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  gifAllowed?: Maybe<Scalars['Boolean']>;
  nsfw?: Maybe<Scalars['Boolean']>;
  slowmode?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};

export type UpdateCommunityInput = {
  communityId: Scalars['ID'];
  name: Scalars['String'];
  title: Scalars['String'];
};

export type UpdateSpotifyModeInput = {
  channelId: Scalars['ID'];
  strategy: SpotifyModeStrategy;
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

export type YoutubeModeCurrent = {
  __typename?: 'YoutubeModeCurrent';
  actions: Array<YoutubeModeCurrentAction>;
  item?: Maybe<YoutubeModeCurrentItem>;
};

export enum YoutubeModeCurrentAction {
  Skip = 'SKIP'
}

export type YoutubeModeCurrentItem = {
  __typename?: 'YoutubeModeCurrentItem';
  id: Scalars['String'];
  videoId: Scalars['String'];
  duration: Scalars['Int'];
  cover: Scalars['String'];
  artists: Scalars['String'];
  title: Scalars['String'];
  startedAt?: Maybe<Scalars['String']>;
  author: YoutubeModeCurrentItemAuthor;
};

export type YoutubeModeCurrentItemAuthor = {
  __typename?: 'YoutubeModeCurrentItemAuthor';
  id: Scalars['String'];
  name: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
};

export type YoutubeModeHistory = {
  __typename?: 'YoutubeModeHistory';
  items: Array<YoutubeModeHistoryItem>;
};

export type YoutubeModeHistoryItem = {
  __typename?: 'YoutubeModeHistoryItem';
  actions: Array<YoutubeModeHistoryItemAction>;
  data: YoutubeModeHistoryItemData;
};

export enum YoutubeModeHistoryItemAction {
  AddToQueue = 'ADD_TO_QUEUE'
}

export type YoutubeModeHistoryItemData = {
  __typename?: 'YoutubeModeHistoryItemData';
  id: Scalars['String'];
  videoId: Scalars['String'];
  duration: Scalars['Int'];
  cover: Scalars['String'];
  artists: Scalars['String'];
  title: Scalars['String'];
  startedAt?: Maybe<Scalars['String']>;
  endedAt?: Maybe<Scalars['String']>;
  author: YoutubeModeHistoryItemDataAuthor;
};

export type YoutubeModeHistoryItemDataAuthor = {
  __typename?: 'YoutubeModeHistoryItemDataAuthor';
  id: Scalars['String'];
  name: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
};

export type YoutubeModeQueue = {
  __typename?: 'YoutubeModeQueue';
  actions: Array<YoutubeModeQueueAction>;
  items: Array<YoutubeModeQueueItem>;
};

export enum YoutubeModeQueueAction {
  AddVideo = 'ADD_VIDEO'
}

export type YoutubeModeQueueItem = {
  __typename?: 'YoutubeModeQueueItem';
  actions: Array<YoutubeModeQueueItemAction>;
  data: YoutubeModeQueueItemData;
};

export enum YoutubeModeQueueItemAction {
  Cancel = 'CANCEL'
}

export type YoutubeModeQueueItemData = {
  __typename?: 'YoutubeModeQueueItemData';
  id: Scalars['String'];
  videoId: Scalars['String'];
  duration: Scalars['Int'];
  cover: Scalars['String'];
  artists: Scalars['String'];
  title: Scalars['String'];
  author: YoutubeModeQueueItemDataAuthor;
};

export type YoutubeModeQueueItemDataAuthor = {
  __typename?: 'YoutubeModeQueueItemDataAuthor';
  id: Scalars['String'];
  name: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
};

export type ChannelMessagesQueryVariables = Exact<{
  channelId: Scalars['ID'];
}>;


export type ChannelMessagesQuery = { __typename?: 'Query', channelMessages: Array<{ __typename?: 'ChannelMessage', id: string, content: string, createdAt: string, tenorGif?: Maybe<{ __typename?: 'TenorGif', id: string, height: number, width: number, preview: string, video: string }>, user: { __typename?: 'User', id: string, name?: Maybe<string>, avatar?: Maybe<string> } }> };

export type CreateChannelMessageMutationVariables = Exact<{
  input: ChannelMessageCreateInput;
}>;


export type CreateChannelMessageMutation = { __typename?: 'Mutation', createChannelMessage: boolean };

export type ChannelMessageCreatedSubscriptionVariables = Exact<{
  channelId: Scalars['ID'];
}>;


export type ChannelMessageCreatedSubscription = { __typename?: 'Subscription', channelMessageCreated: { __typename?: 'ChannelMessage', id: string, content: string, createdAt: string, tenorGif?: Maybe<{ __typename?: 'TenorGif', id: string, height: number, width: number, preview: string, video: string }>, user: { __typename?: 'User', id: string, name?: Maybe<string>, avatar?: Maybe<string> } } };

export type ChannelMessageDeletedSubscriptionVariables = Exact<{
  channelId: Scalars['ID'];
}>;


export type ChannelMessageDeletedSubscription = { __typename?: 'Subscription', channelMessageDeleted: { __typename?: 'ChannelMessage', id: string, content: string, createdAt: string, tenorGif?: Maybe<{ __typename?: 'TenorGif', id: string, height: number, width: number, preview: string, video: string }>, user: { __typename?: 'User', id: string, name?: Maybe<string>, avatar?: Maybe<string> } } };

export type ChannelMessageFieldsFragment = { __typename?: 'ChannelMessage', id: string, content: string, createdAt: string, tenorGif?: Maybe<{ __typename?: 'TenorGif', id: string, height: number, width: number, preview: string, video: string }>, user: { __typename?: 'User', id: string, name?: Maybe<string>, avatar?: Maybe<string> } };

export type MakeTwitchStreamModeCurrentMutationVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type MakeTwitchStreamModeCurrentMutation = { __typename?: 'Mutation', makeTwitchStreamModeCurrent: boolean };

export type MakeSpotifyModeCurrentMutationVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type MakeSpotifyModeCurrentMutation = { __typename?: 'Mutation', makeSpotifyModeCurrent: boolean };

export type MakeWaitlistYoutubeModeCurrentMutationVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type MakeWaitlistYoutubeModeCurrentMutation = { __typename?: 'Mutation', makeWaitlistYoutubeModeCurrent: boolean };

export type ChannelQueryVariables = Exact<{
  name: Scalars['String'];
  communityId: Scalars['String'];
}>;


export type ChannelQuery = { __typename?: 'Query', channel: { __typename?: 'Channel', id: string, name: string, title: string, mode: ChannelMode, gifAllowed: boolean, nsfw: boolean, slowmode: number, state?: Maybe<string>, avatar?: Maybe<string>, onlineCount: number } };

export type CommunityChannelsQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type CommunityChannelsQuery = { __typename?: 'Query', channels: Array<{ __typename?: 'Channel', id: string, name: string, title: string, mode: ChannelMode, gifAllowed: boolean, nsfw: boolean, slowmode: number, state?: Maybe<string>, avatar?: Maybe<string>, onlineCount: number }> };

export type ChannelUsersOnlineQueryVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type ChannelUsersOnlineQuery = { __typename?: 'Query', channelUsersOnline: Array<{ __typename?: 'User', id: string, name?: Maybe<string>, avatar?: Maybe<string> }> };

export type CreateChannelMutationVariables = Exact<{
  input: CreateChannelInput;
}>;


export type CreateChannelMutation = { __typename?: 'Mutation', createChannel: { __typename?: 'Channel', id: string, name: string, title: string, mode: ChannelMode, gifAllowed: boolean, nsfw: boolean, slowmode: number, state?: Maybe<string>, avatar?: Maybe<string>, onlineCount: number } };

export type UpdateChannelMutationVariables = Exact<{
  input: UpdateChannelInput;
}>;


export type UpdateChannelMutation = { __typename?: 'Mutation', updateChannel: { __typename?: 'Channel', id: string, name: string, title: string, mode: ChannelMode, gifAllowed: boolean, nsfw: boolean, slowmode: number, state?: Maybe<string>, avatar?: Maybe<string>, onlineCount: number } };

export type DeleteChannelMutationVariables = Exact<{
  channelId: Scalars['ID'];
}>;


export type DeleteChannelMutation = { __typename?: 'Mutation', deleteChannel: { __typename?: 'Channel', id: string, name: string, title: string, mode: ChannelMode, gifAllowed: boolean, nsfw: boolean, slowmode: number, state?: Maybe<string>, avatar?: Maybe<string>, onlineCount: number } };

export type ChannelFieldsFragment = { __typename?: 'Channel', id: string, name: string, title: string, mode: ChannelMode, gifAllowed: boolean, nsfw: boolean, slowmode: number, state?: Maybe<string>, avatar?: Maybe<string>, onlineCount: number };

export type CommunityQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type CommunityQuery = { __typename?: 'Query', community: { __typename?: 'Community', id: string, name?: Maybe<string>, title: string, avatar?: Maybe<string>, onlineCount: number } };

export type CommunitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type CommunitiesQuery = { __typename?: 'Query', communities: Array<{ __typename?: 'Community', id: string, name?: Maybe<string>, title: string, avatar?: Maybe<string>, onlineCount: number }> };

export type EmojisQueryVariables = Exact<{
  communityId: Scalars['String'];
}>;


export type EmojisQuery = { __typename?: 'Query', emojis: Array<{ __typename?: 'Emoji', id: string, alias: string, authorId: string, createdAt: string, author: { __typename?: 'User', id: string, name?: Maybe<string>, avatar?: Maybe<string> } }> };

export type UniqCountQueryVariables = Exact<{ [key: string]: never; }>;


export type UniqCountQuery = { __typename?: 'Query', uniqCount: number };

export type CreateCommunityMutationVariables = Exact<{
  input: CreateCommunityInput;
}>;


export type CreateCommunityMutation = { __typename?: 'Mutation', createCommunity: { __typename?: 'Community', id: string, name?: Maybe<string>, title: string, avatar?: Maybe<string>, onlineCount: number } };

export type UpdateCommunityMutationVariables = Exact<{
  input: UpdateCommunityInput;
}>;


export type UpdateCommunityMutation = { __typename?: 'Mutation', updateCommunity: { __typename?: 'Community', id: string, name?: Maybe<string>, title: string, avatar?: Maybe<string>, onlineCount: number } };

export type DeleteCommunityMutationVariables = Exact<{
  communityId: Scalars['ID'];
}>;


export type DeleteCommunityMutation = { __typename?: 'Mutation', deleteCommunity: { __typename?: 'Community', id: string, name?: Maybe<string>, title: string, avatar?: Maybe<string>, onlineCount: number } };

export type CommunityFieldsFragment = { __typename?: 'Community', id: string, name?: Maybe<string>, title: string, avatar?: Maybe<string>, onlineCount: number };

export type SpotifyModeFieldsFragment = { __typename?: 'SpotifyMode', id: string, hostId?: Maybe<string>, strategy: SpotifyModeStrategy };

export type SpotifyModeQueryVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type SpotifyModeQuery = { __typename?: 'Query', spotifyMode: { __typename?: 'SpotifyMode', id: string, hostId?: Maybe<string>, strategy: SpotifyModeStrategy } };

export type UpdateSpotifyModeMutationVariables = Exact<{
  input: UpdateSpotifyModeInput;
}>;


export type UpdateSpotifyModeMutation = { __typename?: 'Mutation', updateSpotifyMode: { __typename?: 'SpotifyMode', id: string, hostId?: Maybe<string>, strategy: SpotifyModeStrategy } };

export type SpotifyModeHistoryQueryVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type SpotifyModeHistoryQuery = { __typename?: 'Query', spotifyModeHistory: { __typename?: 'SpotifyModeHistory', items: Array<{ __typename?: 'SpotifyModeHistoryItem', actions: Array<SpotifyModeHistoryItemAction>, data: { __typename?: 'SpotifyModeHistoryItemData', id: string, trackId: string, duration: number, cover: string, artists: string, title: string, startedAt?: Maybe<string>, endedAt?: Maybe<string>, author: { __typename?: 'SpotifyModeHistoryItemDataAuthor', id: string, name: string, avatar?: Maybe<string> } } }> } };

export type SpotifyModeHistoryUpdatedSubscriptionVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type SpotifyModeHistoryUpdatedSubscription = { __typename?: 'Subscription', spotifyModeHistoryUpdated: boolean };

export type SpotifyModeCurrentQueryVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type SpotifyModeCurrentQuery = { __typename?: 'Query', spotifyModeCurrent?: Maybe<{ __typename?: 'SpotifyModeCurrent', actions: Array<SpotifyModeCurrentAction>, item?: Maybe<{ __typename?: 'SpotifyModeCurrentItem', id: string, trackId: string, duration: number, cover: string, artists: string, title: string, start: number, end: number, startedAt?: Maybe<string>, author: { __typename?: 'SpotifyModeCurrentItemAuthor', id: string, name: string, avatar?: Maybe<string> } }> }> };

export type SpotifyModeCurrentUpdatedSubscriptionVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type SpotifyModeCurrentUpdatedSubscription = { __typename?: 'Subscription', spotifyModeCurrentUpdated: boolean };

export type SpotifyModeQueueQueryVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type SpotifyModeQueueQuery = { __typename?: 'Query', spotifyModeQueue: { __typename?: 'SpotifyModeQueue', actions: Array<SpotifyModeQueueAction>, items: Array<{ __typename?: 'SpotifyModeQueueItem', actions: Array<SpotifyModeQueueItemAction>, data: { __typename?: 'SpotifyModeQueueItemData', id: string, trackId: string, duration: number, cover: string, artists: string, title: string, author: { __typename?: 'SpotifyModeQueueItemDataAuthor', id: string, name: string, avatar?: Maybe<string> } } }> } };

export type SpotifyModeQueueUpdatedSubscriptionVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type SpotifyModeQueueUpdatedSubscription = { __typename?: 'Subscription', spotifyModeQueueUpdated: boolean };

export type SpotifyModeQueueAddTrackMutationVariables = Exact<{
  channelId: Scalars['String'];
  trackId: Scalars['String'];
}>;


export type SpotifyModeQueueAddTrackMutation = { __typename?: 'Mutation', spotifyModeQueueAddTrack: boolean };

export type SpotifyModeQueueSkipTrackMutationVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type SpotifyModeQueueSkipTrackMutation = { __typename?: 'Mutation', spotifyModeQueueSkipTrack: boolean };

export type SpotifyModeUserSyncMutationVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type SpotifyModeUserSyncMutation = { __typename?: 'Mutation', spotifyModeUserSync: boolean };

export type TwitchStreamQueryVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type TwitchStreamQuery = { __typename?: 'Query', twitchStream: { __typename?: 'TwitchStream', id: string, channelKey?: Maybe<string> } };

export type UpdateTwitchStreamMutationVariables = Exact<{
  input: UpdateTwitchStreamInput;
}>;


export type UpdateTwitchStreamMutation = { __typename?: 'Mutation', updateTwitchStream: { __typename?: 'TwitchStream', id: string, channelKey?: Maybe<string> } };

export type TwitchStreamFieldsFragment = { __typename?: 'TwitchStream', id: string, channelKey?: Maybe<string> };

export type WaitlistYoutubeHistoryQueryVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type WaitlistYoutubeHistoryQuery = { __typename?: 'Query', waitlistYoutubeHistory: { __typename?: 'YoutubeModeHistory', items: Array<{ __typename?: 'YoutubeModeHistoryItem', actions: Array<YoutubeModeHistoryItemAction>, data: { __typename?: 'YoutubeModeHistoryItemData', id: string, videoId: string, duration: number, cover: string, title: string, startedAt?: Maybe<string>, endedAt?: Maybe<string>, author: { __typename?: 'YoutubeModeHistoryItemDataAuthor', id: string, name: string, avatar?: Maybe<string> } } }> } };

export type WaitlistYoutubeHistoryUpdatedSubscriptionVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type WaitlistYoutubeHistoryUpdatedSubscription = { __typename?: 'Subscription', waitlistYoutubeHistoryUpdated: boolean };

export type WaitlistYoutubeCurrentQueryVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type WaitlistYoutubeCurrentQuery = { __typename?: 'Query', waitlistYoutubeCurrent?: Maybe<{ __typename?: 'YoutubeModeCurrent', actions: Array<YoutubeModeCurrentAction>, item?: Maybe<{ __typename?: 'YoutubeModeCurrentItem', id: string, videoId: string, duration: number, cover: string, title: string, startedAt?: Maybe<string>, author: { __typename?: 'YoutubeModeCurrentItemAuthor', id: string, name: string, avatar?: Maybe<string> } }> }> };

export type WaitlistYoutubeCurrentUpdatedSubscriptionVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type WaitlistYoutubeCurrentUpdatedSubscription = { __typename?: 'Subscription', waitlistYoutubeCurrentUpdated: boolean };

export type WaitlistYoutubeQueueQueryVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type WaitlistYoutubeQueueQuery = { __typename?: 'Query', waitlistYoutubeQueue: { __typename?: 'YoutubeModeQueue', actions: Array<YoutubeModeQueueAction>, items: Array<{ __typename?: 'YoutubeModeQueueItem', actions: Array<YoutubeModeQueueItemAction>, data: { __typename?: 'YoutubeModeQueueItemData', id: string, videoId: string, duration: number, cover: string, title: string, author: { __typename?: 'YoutubeModeQueueItemDataAuthor', id: string, name: string, avatar?: Maybe<string> } } }> } };

export type WaitlistYoutubeQueueUpdatedSubscriptionVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type WaitlistYoutubeQueueUpdatedSubscription = { __typename?: 'Subscription', waitlistYoutubeQueueUpdated: boolean };

export type WaitlistYoutubeQueueAddVideoMutationVariables = Exact<{
  channelId: Scalars['String'];
  videoId: Scalars['String'];
}>;


export type WaitlistYoutubeQueueAddVideoMutation = { __typename?: 'Mutation', waitlistYoutubeQueueAddVideo: boolean };

export type WaitlistYoutubeQueueSkipVideoMutationVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type WaitlistYoutubeQueueSkipVideoMutation = { __typename?: 'Mutation', waitlistYoutubeQueueSkipVideo: boolean };

export type SpotifyNowQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type SpotifyNowQuery = { __typename?: 'Query', spotifyNow?: Maybe<{ __typename?: 'SpotifyNow', id: string, imageUrl: string, artist: string, name: string, progress: number }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, name?: Maybe<string>, avatar?: Maybe<string>, locale: Locale, profiles?: Maybe<Array<{ __typename?: 'Profile', id: string, provider: string }>> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type UpdateConnectionStatusMutationVariables = Exact<{
  channel?: Maybe<Scalars['String']>;
  community?: Maybe<Scalars['String']>;
}>;


export type UpdateConnectionStatusMutation = { __typename?: 'Mutation', updateConnectionStatus: boolean };

export type SetUserLocaleMutationVariables = Exact<{
  locale: Locale;
}>;


export type SetUserLocaleMutation = { __typename?: 'Mutation', setUserLocale: Locale };

export const ChannelMessageFieldsFragmentDoc = gql`
    fragment ChannelMessageFields on ChannelMessage {
  id
  content
  createdAt
  tenorGif {
    id
    height
    width
    preview
    video
  }
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
  gifAllowed
  nsfw
  slowmode
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
export const SpotifyModeFieldsFragmentDoc = gql`
    fragment SpotifyModeFields on SpotifyMode {
  id
  hostId
  strategy
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
export const MakeTwitchStreamModeCurrentDocument = gql`
    mutation makeTwitchStreamModeCurrent($channelId: String!) {
  makeTwitchStreamModeCurrent(channelId: $channelId)
}
    `;
export type MakeTwitchStreamModeCurrentMutationFn = Apollo.MutationFunction<MakeTwitchStreamModeCurrentMutation, MakeTwitchStreamModeCurrentMutationVariables>;

/**
 * __useMakeTwitchStreamModeCurrentMutation__
 *
 * To run a mutation, you first call `useMakeTwitchStreamModeCurrentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeTwitchStreamModeCurrentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeTwitchStreamModeCurrentMutation, { data, loading, error }] = useMakeTwitchStreamModeCurrentMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useMakeTwitchStreamModeCurrentMutation(baseOptions?: Apollo.MutationHookOptions<MakeTwitchStreamModeCurrentMutation, MakeTwitchStreamModeCurrentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MakeTwitchStreamModeCurrentMutation, MakeTwitchStreamModeCurrentMutationVariables>(MakeTwitchStreamModeCurrentDocument, options);
      }
export type MakeTwitchStreamModeCurrentMutationHookResult = ReturnType<typeof useMakeTwitchStreamModeCurrentMutation>;
export type MakeTwitchStreamModeCurrentMutationResult = Apollo.MutationResult<MakeTwitchStreamModeCurrentMutation>;
export type MakeTwitchStreamModeCurrentMutationOptions = Apollo.BaseMutationOptions<MakeTwitchStreamModeCurrentMutation, MakeTwitchStreamModeCurrentMutationVariables>;
export const MakeSpotifyModeCurrentDocument = gql`
    mutation makeSpotifyModeCurrent($channelId: String!) {
  makeSpotifyModeCurrent(channelId: $channelId)
}
    `;
export type MakeSpotifyModeCurrentMutationFn = Apollo.MutationFunction<MakeSpotifyModeCurrentMutation, MakeSpotifyModeCurrentMutationVariables>;

/**
 * __useMakeSpotifyModeCurrentMutation__
 *
 * To run a mutation, you first call `useMakeSpotifyModeCurrentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeSpotifyModeCurrentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeSpotifyModeCurrentMutation, { data, loading, error }] = useMakeSpotifyModeCurrentMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useMakeSpotifyModeCurrentMutation(baseOptions?: Apollo.MutationHookOptions<MakeSpotifyModeCurrentMutation, MakeSpotifyModeCurrentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MakeSpotifyModeCurrentMutation, MakeSpotifyModeCurrentMutationVariables>(MakeSpotifyModeCurrentDocument, options);
      }
export type MakeSpotifyModeCurrentMutationHookResult = ReturnType<typeof useMakeSpotifyModeCurrentMutation>;
export type MakeSpotifyModeCurrentMutationResult = Apollo.MutationResult<MakeSpotifyModeCurrentMutation>;
export type MakeSpotifyModeCurrentMutationOptions = Apollo.BaseMutationOptions<MakeSpotifyModeCurrentMutation, MakeSpotifyModeCurrentMutationVariables>;
export const MakeWaitlistYoutubeModeCurrentDocument = gql`
    mutation makeWaitlistYoutubeModeCurrent($channelId: String!) {
  makeWaitlistYoutubeModeCurrent(channelId: $channelId)
}
    `;
export type MakeWaitlistYoutubeModeCurrentMutationFn = Apollo.MutationFunction<MakeWaitlistYoutubeModeCurrentMutation, MakeWaitlistYoutubeModeCurrentMutationVariables>;

/**
 * __useMakeWaitlistYoutubeModeCurrentMutation__
 *
 * To run a mutation, you first call `useMakeWaitlistYoutubeModeCurrentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeWaitlistYoutubeModeCurrentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeWaitlistYoutubeModeCurrentMutation, { data, loading, error }] = useMakeWaitlistYoutubeModeCurrentMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useMakeWaitlistYoutubeModeCurrentMutation(baseOptions?: Apollo.MutationHookOptions<MakeWaitlistYoutubeModeCurrentMutation, MakeWaitlistYoutubeModeCurrentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MakeWaitlistYoutubeModeCurrentMutation, MakeWaitlistYoutubeModeCurrentMutationVariables>(MakeWaitlistYoutubeModeCurrentDocument, options);
      }
export type MakeWaitlistYoutubeModeCurrentMutationHookResult = ReturnType<typeof useMakeWaitlistYoutubeModeCurrentMutation>;
export type MakeWaitlistYoutubeModeCurrentMutationResult = Apollo.MutationResult<MakeWaitlistYoutubeModeCurrentMutation>;
export type MakeWaitlistYoutubeModeCurrentMutationOptions = Apollo.BaseMutationOptions<MakeWaitlistYoutubeModeCurrentMutation, MakeWaitlistYoutubeModeCurrentMutationVariables>;
export const ChannelDocument = gql`
    query channel($name: String!, $communityId: String!) {
  channel(name: $name, communityId: $communityId) {
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
 *      communityId: // value for 'communityId'
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
export const EmojisDocument = gql`
    query emojis($communityId: String!) {
  emojis(communityId: $communityId) {
    id
    alias
    authorId
    author {
      id
      name
      avatar
    }
    createdAt
  }
}
    `;

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
export const SpotifyModeDocument = gql`
    query spotifyMode($channelId: String!) {
  spotifyMode(channelId: $channelId) {
    ...SpotifyModeFields
  }
}
    ${SpotifyModeFieldsFragmentDoc}`;

/**
 * __useSpotifyModeQuery__
 *
 * To run a query within a React component, call `useSpotifyModeQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpotifyModeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpotifyModeQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useSpotifyModeQuery(baseOptions: Apollo.QueryHookOptions<SpotifyModeQuery, SpotifyModeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SpotifyModeQuery, SpotifyModeQueryVariables>(SpotifyModeDocument, options);
      }
export function useSpotifyModeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SpotifyModeQuery, SpotifyModeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SpotifyModeQuery, SpotifyModeQueryVariables>(SpotifyModeDocument, options);
        }
export type SpotifyModeQueryHookResult = ReturnType<typeof useSpotifyModeQuery>;
export type SpotifyModeLazyQueryHookResult = ReturnType<typeof useSpotifyModeLazyQuery>;
export type SpotifyModeQueryResult = Apollo.QueryResult<SpotifyModeQuery, SpotifyModeQueryVariables>;
export const UpdateSpotifyModeDocument = gql`
    mutation updateSpotifyMode($input: UpdateSpotifyModeInput!) {
  updateSpotifyMode(input: $input) {
    ...SpotifyModeFields
  }
}
    ${SpotifyModeFieldsFragmentDoc}`;
export type UpdateSpotifyModeMutationFn = Apollo.MutationFunction<UpdateSpotifyModeMutation, UpdateSpotifyModeMutationVariables>;

/**
 * __useUpdateSpotifyModeMutation__
 *
 * To run a mutation, you first call `useUpdateSpotifyModeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSpotifyModeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSpotifyModeMutation, { data, loading, error }] = useUpdateSpotifyModeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSpotifyModeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSpotifyModeMutation, UpdateSpotifyModeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSpotifyModeMutation, UpdateSpotifyModeMutationVariables>(UpdateSpotifyModeDocument, options);
      }
export type UpdateSpotifyModeMutationHookResult = ReturnType<typeof useUpdateSpotifyModeMutation>;
export type UpdateSpotifyModeMutationResult = Apollo.MutationResult<UpdateSpotifyModeMutation>;
export type UpdateSpotifyModeMutationOptions = Apollo.BaseMutationOptions<UpdateSpotifyModeMutation, UpdateSpotifyModeMutationVariables>;
export const SpotifyModeHistoryDocument = gql`
    query spotifyModeHistory($channelId: String!) {
  spotifyModeHistory(channelId: $channelId) {
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
 * __useSpotifyModeHistoryQuery__
 *
 * To run a query within a React component, call `useSpotifyModeHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpotifyModeHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpotifyModeHistoryQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useSpotifyModeHistoryQuery(baseOptions: Apollo.QueryHookOptions<SpotifyModeHistoryQuery, SpotifyModeHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SpotifyModeHistoryQuery, SpotifyModeHistoryQueryVariables>(SpotifyModeHistoryDocument, options);
      }
export function useSpotifyModeHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SpotifyModeHistoryQuery, SpotifyModeHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SpotifyModeHistoryQuery, SpotifyModeHistoryQueryVariables>(SpotifyModeHistoryDocument, options);
        }
export type SpotifyModeHistoryQueryHookResult = ReturnType<typeof useSpotifyModeHistoryQuery>;
export type SpotifyModeHistoryLazyQueryHookResult = ReturnType<typeof useSpotifyModeHistoryLazyQuery>;
export type SpotifyModeHistoryQueryResult = Apollo.QueryResult<SpotifyModeHistoryQuery, SpotifyModeHistoryQueryVariables>;
export const SpotifyModeHistoryUpdatedDocument = gql`
    subscription spotifyModeHistoryUpdated($channelId: String!) {
  spotifyModeHistoryUpdated(channelId: $channelId)
}
    `;

/**
 * __useSpotifyModeHistoryUpdatedSubscription__
 *
 * To run a query within a React component, call `useSpotifyModeHistoryUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSpotifyModeHistoryUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpotifyModeHistoryUpdatedSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useSpotifyModeHistoryUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<SpotifyModeHistoryUpdatedSubscription, SpotifyModeHistoryUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SpotifyModeHistoryUpdatedSubscription, SpotifyModeHistoryUpdatedSubscriptionVariables>(SpotifyModeHistoryUpdatedDocument, options);
      }
export type SpotifyModeHistoryUpdatedSubscriptionHookResult = ReturnType<typeof useSpotifyModeHistoryUpdatedSubscription>;
export type SpotifyModeHistoryUpdatedSubscriptionResult = Apollo.SubscriptionResult<SpotifyModeHistoryUpdatedSubscription>;
export const SpotifyModeCurrentDocument = gql`
    query spotifyModeCurrent($channelId: String!) {
  spotifyModeCurrent(channelId: $channelId) {
    item {
      id
      trackId
      duration
      cover
      artists
      title
      start
      end
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
 * __useSpotifyModeCurrentQuery__
 *
 * To run a query within a React component, call `useSpotifyModeCurrentQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpotifyModeCurrentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpotifyModeCurrentQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useSpotifyModeCurrentQuery(baseOptions: Apollo.QueryHookOptions<SpotifyModeCurrentQuery, SpotifyModeCurrentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SpotifyModeCurrentQuery, SpotifyModeCurrentQueryVariables>(SpotifyModeCurrentDocument, options);
      }
export function useSpotifyModeCurrentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SpotifyModeCurrentQuery, SpotifyModeCurrentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SpotifyModeCurrentQuery, SpotifyModeCurrentQueryVariables>(SpotifyModeCurrentDocument, options);
        }
export type SpotifyModeCurrentQueryHookResult = ReturnType<typeof useSpotifyModeCurrentQuery>;
export type SpotifyModeCurrentLazyQueryHookResult = ReturnType<typeof useSpotifyModeCurrentLazyQuery>;
export type SpotifyModeCurrentQueryResult = Apollo.QueryResult<SpotifyModeCurrentQuery, SpotifyModeCurrentQueryVariables>;
export const SpotifyModeCurrentUpdatedDocument = gql`
    subscription spotifyModeCurrentUpdated($channelId: String!) {
  spotifyModeCurrentUpdated(channelId: $channelId)
}
    `;

/**
 * __useSpotifyModeCurrentUpdatedSubscription__
 *
 * To run a query within a React component, call `useSpotifyModeCurrentUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSpotifyModeCurrentUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpotifyModeCurrentUpdatedSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useSpotifyModeCurrentUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<SpotifyModeCurrentUpdatedSubscription, SpotifyModeCurrentUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SpotifyModeCurrentUpdatedSubscription, SpotifyModeCurrentUpdatedSubscriptionVariables>(SpotifyModeCurrentUpdatedDocument, options);
      }
export type SpotifyModeCurrentUpdatedSubscriptionHookResult = ReturnType<typeof useSpotifyModeCurrentUpdatedSubscription>;
export type SpotifyModeCurrentUpdatedSubscriptionResult = Apollo.SubscriptionResult<SpotifyModeCurrentUpdatedSubscription>;
export const SpotifyModeQueueDocument = gql`
    query spotifyModeQueue($channelId: String!) {
  spotifyModeQueue(channelId: $channelId) {
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
 * __useSpotifyModeQueueQuery__
 *
 * To run a query within a React component, call `useSpotifyModeQueueQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpotifyModeQueueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpotifyModeQueueQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useSpotifyModeQueueQuery(baseOptions: Apollo.QueryHookOptions<SpotifyModeQueueQuery, SpotifyModeQueueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SpotifyModeQueueQuery, SpotifyModeQueueQueryVariables>(SpotifyModeQueueDocument, options);
      }
export function useSpotifyModeQueueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SpotifyModeQueueQuery, SpotifyModeQueueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SpotifyModeQueueQuery, SpotifyModeQueueQueryVariables>(SpotifyModeQueueDocument, options);
        }
export type SpotifyModeQueueQueryHookResult = ReturnType<typeof useSpotifyModeQueueQuery>;
export type SpotifyModeQueueLazyQueryHookResult = ReturnType<typeof useSpotifyModeQueueLazyQuery>;
export type SpotifyModeQueueQueryResult = Apollo.QueryResult<SpotifyModeQueueQuery, SpotifyModeQueueQueryVariables>;
export const SpotifyModeQueueUpdatedDocument = gql`
    subscription spotifyModeQueueUpdated($channelId: String!) {
  spotifyModeQueueUpdated(channelId: $channelId)
}
    `;

/**
 * __useSpotifyModeQueueUpdatedSubscription__
 *
 * To run a query within a React component, call `useSpotifyModeQueueUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSpotifyModeQueueUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpotifyModeQueueUpdatedSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useSpotifyModeQueueUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<SpotifyModeQueueUpdatedSubscription, SpotifyModeQueueUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SpotifyModeQueueUpdatedSubscription, SpotifyModeQueueUpdatedSubscriptionVariables>(SpotifyModeQueueUpdatedDocument, options);
      }
export type SpotifyModeQueueUpdatedSubscriptionHookResult = ReturnType<typeof useSpotifyModeQueueUpdatedSubscription>;
export type SpotifyModeQueueUpdatedSubscriptionResult = Apollo.SubscriptionResult<SpotifyModeQueueUpdatedSubscription>;
export const SpotifyModeQueueAddTrackDocument = gql`
    mutation spotifyModeQueueAddTrack($channelId: String!, $trackId: String!) {
  spotifyModeQueueAddTrack(channelId: $channelId, trackId: $trackId)
}
    `;
export type SpotifyModeQueueAddTrackMutationFn = Apollo.MutationFunction<SpotifyModeQueueAddTrackMutation, SpotifyModeQueueAddTrackMutationVariables>;

/**
 * __useSpotifyModeQueueAddTrackMutation__
 *
 * To run a mutation, you first call `useSpotifyModeQueueAddTrackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSpotifyModeQueueAddTrackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [spotifyModeQueueAddTrackMutation, { data, loading, error }] = useSpotifyModeQueueAddTrackMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      trackId: // value for 'trackId'
 *   },
 * });
 */
export function useSpotifyModeQueueAddTrackMutation(baseOptions?: Apollo.MutationHookOptions<SpotifyModeQueueAddTrackMutation, SpotifyModeQueueAddTrackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SpotifyModeQueueAddTrackMutation, SpotifyModeQueueAddTrackMutationVariables>(SpotifyModeQueueAddTrackDocument, options);
      }
export type SpotifyModeQueueAddTrackMutationHookResult = ReturnType<typeof useSpotifyModeQueueAddTrackMutation>;
export type SpotifyModeQueueAddTrackMutationResult = Apollo.MutationResult<SpotifyModeQueueAddTrackMutation>;
export type SpotifyModeQueueAddTrackMutationOptions = Apollo.BaseMutationOptions<SpotifyModeQueueAddTrackMutation, SpotifyModeQueueAddTrackMutationVariables>;
export const SpotifyModeQueueSkipTrackDocument = gql`
    mutation spotifyModeQueueSkipTrack($channelId: String!) {
  spotifyModeQueueSkipTrack(channelId: $channelId)
}
    `;
export type SpotifyModeQueueSkipTrackMutationFn = Apollo.MutationFunction<SpotifyModeQueueSkipTrackMutation, SpotifyModeQueueSkipTrackMutationVariables>;

/**
 * __useSpotifyModeQueueSkipTrackMutation__
 *
 * To run a mutation, you first call `useSpotifyModeQueueSkipTrackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSpotifyModeQueueSkipTrackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [spotifyModeQueueSkipTrackMutation, { data, loading, error }] = useSpotifyModeQueueSkipTrackMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useSpotifyModeQueueSkipTrackMutation(baseOptions?: Apollo.MutationHookOptions<SpotifyModeQueueSkipTrackMutation, SpotifyModeQueueSkipTrackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SpotifyModeQueueSkipTrackMutation, SpotifyModeQueueSkipTrackMutationVariables>(SpotifyModeQueueSkipTrackDocument, options);
      }
export type SpotifyModeQueueSkipTrackMutationHookResult = ReturnType<typeof useSpotifyModeQueueSkipTrackMutation>;
export type SpotifyModeQueueSkipTrackMutationResult = Apollo.MutationResult<SpotifyModeQueueSkipTrackMutation>;
export type SpotifyModeQueueSkipTrackMutationOptions = Apollo.BaseMutationOptions<SpotifyModeQueueSkipTrackMutation, SpotifyModeQueueSkipTrackMutationVariables>;
export const SpotifyModeUserSyncDocument = gql`
    mutation spotifyModeUserSync($channelId: String!) {
  spotifyModeUserSync(channelId: $channelId)
}
    `;
export type SpotifyModeUserSyncMutationFn = Apollo.MutationFunction<SpotifyModeUserSyncMutation, SpotifyModeUserSyncMutationVariables>;

/**
 * __useSpotifyModeUserSyncMutation__
 *
 * To run a mutation, you first call `useSpotifyModeUserSyncMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSpotifyModeUserSyncMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [spotifyModeUserSyncMutation, { data, loading, error }] = useSpotifyModeUserSyncMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useSpotifyModeUserSyncMutation(baseOptions?: Apollo.MutationHookOptions<SpotifyModeUserSyncMutation, SpotifyModeUserSyncMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SpotifyModeUserSyncMutation, SpotifyModeUserSyncMutationVariables>(SpotifyModeUserSyncDocument, options);
      }
export type SpotifyModeUserSyncMutationHookResult = ReturnType<typeof useSpotifyModeUserSyncMutation>;
export type SpotifyModeUserSyncMutationResult = Apollo.MutationResult<SpotifyModeUserSyncMutation>;
export type SpotifyModeUserSyncMutationOptions = Apollo.BaseMutationOptions<SpotifyModeUserSyncMutation, SpotifyModeUserSyncMutationVariables>;
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
export const WaitlistYoutubeHistoryDocument = gql`
    query waitlistYoutubeHistory($channelId: String!) {
  waitlistYoutubeHistory(channelId: $channelId) {
    items {
      data {
        id
        videoId
        duration
        cover
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
 * __useWaitlistYoutubeHistoryQuery__
 *
 * To run a query within a React component, call `useWaitlistYoutubeHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useWaitlistYoutubeHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWaitlistYoutubeHistoryQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useWaitlistYoutubeHistoryQuery(baseOptions: Apollo.QueryHookOptions<WaitlistYoutubeHistoryQuery, WaitlistYoutubeHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WaitlistYoutubeHistoryQuery, WaitlistYoutubeHistoryQueryVariables>(WaitlistYoutubeHistoryDocument, options);
      }
export function useWaitlistYoutubeHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WaitlistYoutubeHistoryQuery, WaitlistYoutubeHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WaitlistYoutubeHistoryQuery, WaitlistYoutubeHistoryQueryVariables>(WaitlistYoutubeHistoryDocument, options);
        }
export type WaitlistYoutubeHistoryQueryHookResult = ReturnType<typeof useWaitlistYoutubeHistoryQuery>;
export type WaitlistYoutubeHistoryLazyQueryHookResult = ReturnType<typeof useWaitlistYoutubeHistoryLazyQuery>;
export type WaitlistYoutubeHistoryQueryResult = Apollo.QueryResult<WaitlistYoutubeHistoryQuery, WaitlistYoutubeHistoryQueryVariables>;
export const WaitlistYoutubeHistoryUpdatedDocument = gql`
    subscription waitlistYoutubeHistoryUpdated($channelId: String!) {
  waitlistYoutubeHistoryUpdated(channelId: $channelId)
}
    `;

/**
 * __useWaitlistYoutubeHistoryUpdatedSubscription__
 *
 * To run a query within a React component, call `useWaitlistYoutubeHistoryUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useWaitlistYoutubeHistoryUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWaitlistYoutubeHistoryUpdatedSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useWaitlistYoutubeHistoryUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<WaitlistYoutubeHistoryUpdatedSubscription, WaitlistYoutubeHistoryUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<WaitlistYoutubeHistoryUpdatedSubscription, WaitlistYoutubeHistoryUpdatedSubscriptionVariables>(WaitlistYoutubeHistoryUpdatedDocument, options);
      }
export type WaitlistYoutubeHistoryUpdatedSubscriptionHookResult = ReturnType<typeof useWaitlistYoutubeHistoryUpdatedSubscription>;
export type WaitlistYoutubeHistoryUpdatedSubscriptionResult = Apollo.SubscriptionResult<WaitlistYoutubeHistoryUpdatedSubscription>;
export const WaitlistYoutubeCurrentDocument = gql`
    query waitlistYoutubeCurrent($channelId: String!) {
  waitlistYoutubeCurrent(channelId: $channelId) {
    item {
      id
      videoId
      duration
      cover
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
 * __useWaitlistYoutubeCurrentQuery__
 *
 * To run a query within a React component, call `useWaitlistYoutubeCurrentQuery` and pass it any options that fit your needs.
 * When your component renders, `useWaitlistYoutubeCurrentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWaitlistYoutubeCurrentQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useWaitlistYoutubeCurrentQuery(baseOptions: Apollo.QueryHookOptions<WaitlistYoutubeCurrentQuery, WaitlistYoutubeCurrentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WaitlistYoutubeCurrentQuery, WaitlistYoutubeCurrentQueryVariables>(WaitlistYoutubeCurrentDocument, options);
      }
export function useWaitlistYoutubeCurrentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WaitlistYoutubeCurrentQuery, WaitlistYoutubeCurrentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WaitlistYoutubeCurrentQuery, WaitlistYoutubeCurrentQueryVariables>(WaitlistYoutubeCurrentDocument, options);
        }
export type WaitlistYoutubeCurrentQueryHookResult = ReturnType<typeof useWaitlistYoutubeCurrentQuery>;
export type WaitlistYoutubeCurrentLazyQueryHookResult = ReturnType<typeof useWaitlistYoutubeCurrentLazyQuery>;
export type WaitlistYoutubeCurrentQueryResult = Apollo.QueryResult<WaitlistYoutubeCurrentQuery, WaitlistYoutubeCurrentQueryVariables>;
export const WaitlistYoutubeCurrentUpdatedDocument = gql`
    subscription waitlistYoutubeCurrentUpdated($channelId: String!) {
  waitlistYoutubeCurrentUpdated(channelId: $channelId)
}
    `;

/**
 * __useWaitlistYoutubeCurrentUpdatedSubscription__
 *
 * To run a query within a React component, call `useWaitlistYoutubeCurrentUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useWaitlistYoutubeCurrentUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWaitlistYoutubeCurrentUpdatedSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useWaitlistYoutubeCurrentUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<WaitlistYoutubeCurrentUpdatedSubscription, WaitlistYoutubeCurrentUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<WaitlistYoutubeCurrentUpdatedSubscription, WaitlistYoutubeCurrentUpdatedSubscriptionVariables>(WaitlistYoutubeCurrentUpdatedDocument, options);
      }
export type WaitlistYoutubeCurrentUpdatedSubscriptionHookResult = ReturnType<typeof useWaitlistYoutubeCurrentUpdatedSubscription>;
export type WaitlistYoutubeCurrentUpdatedSubscriptionResult = Apollo.SubscriptionResult<WaitlistYoutubeCurrentUpdatedSubscription>;
export const WaitlistYoutubeQueueDocument = gql`
    query waitlistYoutubeQueue($channelId: String!) {
  waitlistYoutubeQueue(channelId: $channelId) {
    items {
      data {
        id
        videoId
        duration
        cover
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
 * __useWaitlistYoutubeQueueQuery__
 *
 * To run a query within a React component, call `useWaitlistYoutubeQueueQuery` and pass it any options that fit your needs.
 * When your component renders, `useWaitlistYoutubeQueueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWaitlistYoutubeQueueQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useWaitlistYoutubeQueueQuery(baseOptions: Apollo.QueryHookOptions<WaitlistYoutubeQueueQuery, WaitlistYoutubeQueueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WaitlistYoutubeQueueQuery, WaitlistYoutubeQueueQueryVariables>(WaitlistYoutubeQueueDocument, options);
      }
export function useWaitlistYoutubeQueueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WaitlistYoutubeQueueQuery, WaitlistYoutubeQueueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WaitlistYoutubeQueueQuery, WaitlistYoutubeQueueQueryVariables>(WaitlistYoutubeQueueDocument, options);
        }
export type WaitlistYoutubeQueueQueryHookResult = ReturnType<typeof useWaitlistYoutubeQueueQuery>;
export type WaitlistYoutubeQueueLazyQueryHookResult = ReturnType<typeof useWaitlistYoutubeQueueLazyQuery>;
export type WaitlistYoutubeQueueQueryResult = Apollo.QueryResult<WaitlistYoutubeQueueQuery, WaitlistYoutubeQueueQueryVariables>;
export const WaitlistYoutubeQueueUpdatedDocument = gql`
    subscription waitlistYoutubeQueueUpdated($channelId: String!) {
  waitlistYoutubeQueueUpdated(channelId: $channelId)
}
    `;

/**
 * __useWaitlistYoutubeQueueUpdatedSubscription__
 *
 * To run a query within a React component, call `useWaitlistYoutubeQueueUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useWaitlistYoutubeQueueUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWaitlistYoutubeQueueUpdatedSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useWaitlistYoutubeQueueUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<WaitlistYoutubeQueueUpdatedSubscription, WaitlistYoutubeQueueUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<WaitlistYoutubeQueueUpdatedSubscription, WaitlistYoutubeQueueUpdatedSubscriptionVariables>(WaitlistYoutubeQueueUpdatedDocument, options);
      }
export type WaitlistYoutubeQueueUpdatedSubscriptionHookResult = ReturnType<typeof useWaitlistYoutubeQueueUpdatedSubscription>;
export type WaitlistYoutubeQueueUpdatedSubscriptionResult = Apollo.SubscriptionResult<WaitlistYoutubeQueueUpdatedSubscription>;
export const WaitlistYoutubeQueueAddVideoDocument = gql`
    mutation waitlistYoutubeQueueAddVideo($channelId: String!, $videoId: String!) {
  waitlistYoutubeQueueAddVideo(channelId: $channelId, videoId: $videoId)
}
    `;
export type WaitlistYoutubeQueueAddVideoMutationFn = Apollo.MutationFunction<WaitlistYoutubeQueueAddVideoMutation, WaitlistYoutubeQueueAddVideoMutationVariables>;

/**
 * __useWaitlistYoutubeQueueAddVideoMutation__
 *
 * To run a mutation, you first call `useWaitlistYoutubeQueueAddVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWaitlistYoutubeQueueAddVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [waitlistYoutubeQueueAddVideoMutation, { data, loading, error }] = useWaitlistYoutubeQueueAddVideoMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useWaitlistYoutubeQueueAddVideoMutation(baseOptions?: Apollo.MutationHookOptions<WaitlistYoutubeQueueAddVideoMutation, WaitlistYoutubeQueueAddVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<WaitlistYoutubeQueueAddVideoMutation, WaitlistYoutubeQueueAddVideoMutationVariables>(WaitlistYoutubeQueueAddVideoDocument, options);
      }
export type WaitlistYoutubeQueueAddVideoMutationHookResult = ReturnType<typeof useWaitlistYoutubeQueueAddVideoMutation>;
export type WaitlistYoutubeQueueAddVideoMutationResult = Apollo.MutationResult<WaitlistYoutubeQueueAddVideoMutation>;
export type WaitlistYoutubeQueueAddVideoMutationOptions = Apollo.BaseMutationOptions<WaitlistYoutubeQueueAddVideoMutation, WaitlistYoutubeQueueAddVideoMutationVariables>;
export const WaitlistYoutubeQueueSkipVideoDocument = gql`
    mutation waitlistYoutubeQueueSkipVideo($channelId: String!) {
  waitlistYoutubeQueueSkipVideo(channelId: $channelId)
}
    `;
export type WaitlistYoutubeQueueSkipVideoMutationFn = Apollo.MutationFunction<WaitlistYoutubeQueueSkipVideoMutation, WaitlistYoutubeQueueSkipVideoMutationVariables>;

/**
 * __useWaitlistYoutubeQueueSkipVideoMutation__
 *
 * To run a mutation, you first call `useWaitlistYoutubeQueueSkipVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWaitlistYoutubeQueueSkipVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [waitlistYoutubeQueueSkipVideoMutation, { data, loading, error }] = useWaitlistYoutubeQueueSkipVideoMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useWaitlistYoutubeQueueSkipVideoMutation(baseOptions?: Apollo.MutationHookOptions<WaitlistYoutubeQueueSkipVideoMutation, WaitlistYoutubeQueueSkipVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<WaitlistYoutubeQueueSkipVideoMutation, WaitlistYoutubeQueueSkipVideoMutationVariables>(WaitlistYoutubeQueueSkipVideoDocument, options);
      }
export type WaitlistYoutubeQueueSkipVideoMutationHookResult = ReturnType<typeof useWaitlistYoutubeQueueSkipVideoMutation>;
export type WaitlistYoutubeQueueSkipVideoMutationResult = Apollo.MutationResult<WaitlistYoutubeQueueSkipVideoMutation>;
export type WaitlistYoutubeQueueSkipVideoMutationOptions = Apollo.BaseMutationOptions<WaitlistYoutubeQueueSkipVideoMutation, WaitlistYoutubeQueueSkipVideoMutationVariables>;
export const SpotifyNowDocument = gql`
    query spotifyNow($userId: String!) {
  spotifyNow(userId: $userId) {
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
 *      userId: // value for 'userId'
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