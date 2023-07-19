export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Channel = {
  __typename?: 'Channel';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  gifAllowed: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  mode: ChannelMode;
  name: Scalars['String']['output'];
  nsfw: Scalars['Boolean']['output'];
  onlineCount: Scalars['Float']['output'];
  slowmode: Scalars['Int']['output'];
  state?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ChannelMessage = {
  __typename?: 'ChannelMessage';
  channelId: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  tenorGif?: Maybe<TenorGif>;
  user: User;
  userId: Scalars['String']['output'];
};

export type ChannelMessageCreateInput = {
  channelId: Scalars['String']['input'];
  content: Scalars['String']['input'];
};

export enum ChannelMode {
  None = 'NONE',
  Spotify = 'SPOTIFY',
  Twitch = 'TWITCH',
  Youtube = 'YOUTUBE'
}

export type ChannelSettings = {
  __typename?: 'ChannelSettings';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  gifAllowed: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  mode: ChannelMode;
  name: Scalars['String']['output'];
  nsfw: Scalars['Boolean']['output'];
  slowmode: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Community = {
  __typename?: 'Community';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  onlineCount: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CommunitySettings = {
  __typename?: 'CommunitySettings';
  avatar?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type CreateChannelInput = {
  communityId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateCommunityInput = {
  name: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Emoji = {
  __typename?: 'Emoji';
  alias: Scalars['String']['output'];
  author: User;
  authorId: Scalars['String']['output'];
  communityId: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export enum Locale {
  EnUs = 'en_US',
  RuRu = 'ru_RU'
}

export type Mutation = {
  __typename?: 'Mutation';
  createChannel: Channel;
  createChannelMessage: Scalars['Boolean']['output'];
  createCommunity: Community;
  deleteChannel: Channel;
  deleteCommunity: Community;
  deleteEmoji: Scalars['Boolean']['output'];
  logout: Scalars['Boolean']['output'];
  makeSpotifyModeCurrent: Scalars['Boolean']['output'];
  makeTwitchStreamModeCurrent: Scalars['Boolean']['output'];
  makeWaitlistYoutubeModeCurrent: Scalars['Boolean']['output'];
  refreshSpotifyToken: Scalars['String']['output'];
  setUserLocale: Locale;
  spotifyModeQueueAddTrack: Scalars['Boolean']['output'];
  spotifyModeQueueSkipTrack: Scalars['Boolean']['output'];
  spotifyModeUserSync: Scalars['Boolean']['output'];
  updateChannel: Channel;
  updateChannelSettings: ChannelSettings;
  updateCommunity: Community;
  updateCommunitySettings: CommunitySettings;
  updateConnectionStatus: Scalars['Boolean']['output'];
  updateEmojiAlias: Emoji;
  updateSpotifyMode: SpotifyMode;
  updateTwitchStream: TwitchStream;
  waitlistYoutubeQueueAddVideo: Scalars['Boolean']['output'];
  waitlistYoutubeQueueSkipVideo: Scalars['Boolean']['output'];
};


export type MutationCreateChannelArgs = {
  input: CreateChannelInput;
};


export type MutationCreateChannelMessageArgs = {
  input: ChannelMessageCreateInput;
};


export type MutationCreateCommunityArgs = {
  input: CreateCommunityInput;
};


export type MutationDeleteChannelArgs = {
  channelId: Scalars['ID']['input'];
};


export type MutationDeleteCommunityArgs = {
  communityId: Scalars['ID']['input'];
};


export type MutationDeleteEmojiArgs = {
  emojiId: Scalars['String']['input'];
};


export type MutationMakeSpotifyModeCurrentArgs = {
  channelId: Scalars['String']['input'];
};


export type MutationMakeTwitchStreamModeCurrentArgs = {
  channelId: Scalars['String']['input'];
};


export type MutationMakeWaitlistYoutubeModeCurrentArgs = {
  channelId: Scalars['String']['input'];
};


export type MutationSetUserLocaleArgs = {
  locale: Locale;
};


export type MutationSpotifyModeQueueAddTrackArgs = {
  channelId: Scalars['String']['input'];
  trackId: Scalars['String']['input'];
};


export type MutationSpotifyModeQueueSkipTrackArgs = {
  channelId: Scalars['String']['input'];
};


export type MutationSpotifyModeUserSyncArgs = {
  channelId: Scalars['String']['input'];
};


export type MutationUpdateChannelArgs = {
  input: UpdateChannelInput;
};


export type MutationUpdateChannelSettingsArgs = {
  input: UpdateChannelSettingsInput;
};


export type MutationUpdateCommunityArgs = {
  input: UpdateCommunityInput;
};


export type MutationUpdateCommunitySettingsArgs = {
  input: UpdateCommunitySettingsInput;
};


export type MutationUpdateConnectionStatusArgs = {
  channel?: InputMaybe<Scalars['String']['input']>;
  community?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateEmojiAliasArgs = {
  alias: Scalars['String']['input'];
  emojiId: Scalars['String']['input'];
};


export type MutationUpdateSpotifyModeArgs = {
  input: UpdateSpotifyModeInput;
};


export type MutationUpdateTwitchStreamArgs = {
  input: UpdateTwitchStreamInput;
};


export type MutationWaitlistYoutubeQueueAddVideoArgs = {
  channelId: Scalars['String']['input'];
  videoId: Scalars['String']['input'];
};


export type MutationWaitlistYoutubeQueueSkipVideoArgs = {
  channelId: Scalars['String']['input'];
};

export type Profile = {
  __typename?: 'Profile';
  avatar?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  provider: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  channel: Channel;
  channelMessages: Array<ChannelMessage>;
  channelUsersOnline: Array<User>;
  channels: Array<Channel>;
  communities: Array<Community>;
  community: Community;
  communitySettings: CommunitySettings;
  emoji: Emoji;
  emojis: Array<Emoji>;
  me: User;
  spotifyMode: SpotifyMode;
  spotifyModeCurrent?: Maybe<SpotifyModeCurrent>;
  spotifyModeHistory: SpotifyModeHistory;
  spotifyModeQueue: SpotifyModeQueue;
  spotifyNow?: Maybe<SpotifyNow>;
  spotifyToken: Scalars['String']['output'];
  twitchStream: TwitchStream;
  user?: Maybe<User>;
  waitlistYoutubeCurrent?: Maybe<YoutubeModeCurrent>;
  waitlistYoutubeHistory: YoutubeModeHistory;
  waitlistYoutubeQueue: YoutubeModeQueue;
};


export type QueryChannelArgs = {
  communityId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type QueryChannelMessagesArgs = {
  channelId: Scalars['ID']['input'];
};


export type QueryChannelUsersOnlineArgs = {
  channelId: Scalars['String']['input'];
};


export type QueryChannelsArgs = {
  name: Scalars['String']['input'];
};


export type QueryCommunityArgs = {
  name: Scalars['String']['input'];
};


export type QueryCommunitySettingsArgs = {
  name: Scalars['String']['input'];
};


export type QueryEmojiArgs = {
  emojiId: Scalars['String']['input'];
};


export type QueryEmojisArgs = {
  communityId: Scalars['String']['input'];
};


export type QuerySpotifyModeArgs = {
  channelId: Scalars['String']['input'];
};


export type QuerySpotifyModeCurrentArgs = {
  channelId: Scalars['String']['input'];
};


export type QuerySpotifyModeHistoryArgs = {
  channelId: Scalars['String']['input'];
};


export type QuerySpotifyModeQueueArgs = {
  channelId: Scalars['String']['input'];
};


export type QuerySpotifyNowArgs = {
  userId: Scalars['String']['input'];
};


export type QueryTwitchStreamArgs = {
  channelId: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryWaitlistYoutubeCurrentArgs = {
  channelId: Scalars['String']['input'];
};


export type QueryWaitlistYoutubeHistoryArgs = {
  channelId: Scalars['String']['input'];
};


export type QueryWaitlistYoutubeQueueArgs = {
  channelId: Scalars['String']['input'];
};

export type SpotifyMode = {
  __typename?: 'SpotifyMode';
  hostId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
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
  artists: Scalars['String']['output'];
  author: SpotifyModeCurrentItemAuthor;
  cover: Scalars['String']['output'];
  duration: Scalars['Int']['output'];
  end: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  start: Scalars['Int']['output'];
  startedAt?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  trackId: Scalars['String']['output'];
};

export type SpotifyModeCurrentItemAuthor = {
  __typename?: 'SpotifyModeCurrentItemAuthor';
  avatar?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
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
  artists: Scalars['String']['output'];
  author: SpotifyModeHistoryItemDataAuthor;
  cover: Scalars['String']['output'];
  duration: Scalars['Int']['output'];
  endedAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  startedAt?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  trackId: Scalars['String']['output'];
};

export type SpotifyModeHistoryItemDataAuthor = {
  __typename?: 'SpotifyModeHistoryItemDataAuthor';
  avatar?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
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
  artists: Scalars['String']['output'];
  author: SpotifyModeQueueItemDataAuthor;
  cover: Scalars['String']['output'];
  duration: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
  trackId: Scalars['String']['output'];
};

export type SpotifyModeQueueItemDataAuthor = {
  __typename?: 'SpotifyModeQueueItemDataAuthor';
  avatar?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export enum SpotifyModeStrategy {
  Host = 'HOST',
  Queue = 'QUEUE'
}

export type SpotifyNow = {
  __typename?: 'SpotifyNow';
  artist: Scalars['String']['output'];
  id: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
  progress: Scalars['Float']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  channelMessageCreated: ChannelMessage;
  channelMessageDeleted: ChannelMessage;
  spotifyModeCurrentUpdated: Scalars['Boolean']['output'];
  spotifyModeHistoryUpdated: Scalars['Boolean']['output'];
  spotifyModeQueueUpdated: Scalars['Boolean']['output'];
  waitlistYoutubeCurrentUpdated: Scalars['Boolean']['output'];
  waitlistYoutubeHistoryUpdated: Scalars['Boolean']['output'];
  waitlistYoutubeQueueUpdated: Scalars['Boolean']['output'];
};


export type SubscriptionChannelMessageCreatedArgs = {
  channelId: Scalars['ID']['input'];
};


export type SubscriptionChannelMessageDeletedArgs = {
  channelId: Scalars['ID']['input'];
};


export type SubscriptionSpotifyModeCurrentUpdatedArgs = {
  channelId: Scalars['String']['input'];
};


export type SubscriptionSpotifyModeHistoryUpdatedArgs = {
  channelId: Scalars['String']['input'];
};


export type SubscriptionSpotifyModeQueueUpdatedArgs = {
  channelId: Scalars['String']['input'];
};


export type SubscriptionWaitlistYoutubeCurrentUpdatedArgs = {
  channelId: Scalars['String']['input'];
};


export type SubscriptionWaitlistYoutubeHistoryUpdatedArgs = {
  channelId: Scalars['String']['input'];
};


export type SubscriptionWaitlistYoutubeQueueUpdatedArgs = {
  channelId: Scalars['String']['input'];
};

export type TenorGif = {
  __typename?: 'TenorGif';
  height: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  preview: Scalars['String']['output'];
  video: Scalars['String']['output'];
  width: Scalars['Float']['output'];
};

export type TwitchStream = {
  __typename?: 'TwitchStream';
  channelKey?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
};

export type UpdateChannelInput = {
  channelId: Scalars['ID']['input'];
  communityId: Scalars['ID']['input'];
  gifAllowed?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nsfw?: InputMaybe<Scalars['Boolean']['input']>;
  slowmode?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateChannelSettingsInput = {
  channelId: Scalars['ID']['input'];
  communityId: Scalars['ID']['input'];
  gifAllowed?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nsfw?: InputMaybe<Scalars['Boolean']['input']>;
  slowmode?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCommunityInput = {
  communityId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type UpdateCommunitySettingsInput = {
  communityId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type UpdateSpotifyModeInput = {
  channelId: Scalars['ID']['input'];
  strategy: SpotifyModeStrategy;
};

export type UpdateTwitchStreamInput = {
  channelId: Scalars['ID']['input'];
  channelKey: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  locale: Locale;
  name?: Maybe<Scalars['String']['output']>;
  profiles?: Maybe<Array<Profile>>;
  updatedAt: Scalars['DateTime']['output'];
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
  artists: Scalars['String']['output'];
  author: YoutubeModeCurrentItemAuthor;
  cover: Scalars['String']['output'];
  duration: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  startedAt?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  videoId: Scalars['String']['output'];
};

export type YoutubeModeCurrentItemAuthor = {
  __typename?: 'YoutubeModeCurrentItemAuthor';
  avatar?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
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
  artists: Scalars['String']['output'];
  author: YoutubeModeHistoryItemDataAuthor;
  cover: Scalars['String']['output'];
  duration: Scalars['Int']['output'];
  endedAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  startedAt?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  videoId: Scalars['String']['output'];
};

export type YoutubeModeHistoryItemDataAuthor = {
  __typename?: 'YoutubeModeHistoryItemDataAuthor';
  avatar?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
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
  artists: Scalars['String']['output'];
  author: YoutubeModeQueueItemDataAuthor;
  cover: Scalars['String']['output'];
  duration: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
  videoId: Scalars['String']['output'];
};

export type YoutubeModeQueueItemDataAuthor = {
  __typename?: 'YoutubeModeQueueItemDataAuthor';
  avatar?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};
