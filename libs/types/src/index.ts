export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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

export type Channel = {
  __typename?: 'Channel';
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  gifAllowed: Scalars['Boolean'];
  id: Scalars['String'];
  mode: ChannelMode;
  name: Scalars['String'];
  nsfw: Scalars['Boolean'];
  onlineCount: Scalars['Float'];
  slowmode: Scalars['Int'];
  state?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ChannelMessage = {
  __typename?: 'ChannelMessage';
  channelId: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['String'];
  tenorGif?: Maybe<TenorGif>;
  user: User;
  userId: Scalars['String'];
};

export type ChannelMessageCreateInput = {
  channelId: Scalars['String'];
  content: Scalars['String'];
};

export enum ChannelMode {
  None = 'NONE',
  Spotify = 'SPOTIFY',
  Twitch = 'TWITCH',
  Youtube = 'YOUTUBE'
}

export type ChannelSettings = {
  __typename?: 'ChannelSettings';
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  gifAllowed: Scalars['Boolean'];
  id: Scalars['String'];
  mode: ChannelMode;
  name: Scalars['String'];
  nsfw: Scalars['Boolean'];
  slowmode: Scalars['Int'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Community = {
  __typename?: 'Community';
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  onlineCount: Scalars['Float'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type CommunitySettings = {
  __typename?: 'CommunitySettings';
  avatar?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  title: Scalars['String'];
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
  alias: Scalars['String'];
  author: User;
  authorId: Scalars['String'];
  communityId: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['String'];
  type: Scalars['String'];
};

export enum Locale {
  EnUs = 'en_US',
  RuRu = 'ru_RU'
}

export type Mutation = {
  __typename?: 'Mutation';
  createChannel: Channel;
  createChannelMessage: Scalars['Boolean'];
  createCommunity: Community;
  deleteChannel: Channel;
  deleteCommunity: Community;
  deleteEmoji: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  makeSpotifyModeCurrent: Scalars['Boolean'];
  makeTwitchStreamModeCurrent: Scalars['Boolean'];
  makeWaitlistYoutubeModeCurrent: Scalars['Boolean'];
  refreshSpotifyToken: Scalars['String'];
  setUserLocale: Locale;
  spotifyModeQueueAddTrack: Scalars['Boolean'];
  spotifyModeQueueSkipTrack: Scalars['Boolean'];
  spotifyModeUserSync: Scalars['Boolean'];
  updateChannel: Channel;
  updateChannelSettings: ChannelSettings;
  updateCommunity: Community;
  updateCommunitySettings: CommunitySettings;
  updateConnectionStatus: Scalars['Boolean'];
  updateEmojiAlias: Emoji;
  updateSpotifyMode: SpotifyMode;
  updateTwitchStream: TwitchStream;
  waitlistYoutubeQueueAddVideo: Scalars['Boolean'];
  waitlistYoutubeQueueSkipVideo: Scalars['Boolean'];
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
  channelId: Scalars['ID'];
};


export type MutationDeleteCommunityArgs = {
  communityId: Scalars['ID'];
};


export type MutationDeleteEmojiArgs = {
  emojiId: Scalars['String'];
};


export type MutationMakeSpotifyModeCurrentArgs = {
  channelId: Scalars['String'];
};


export type MutationMakeTwitchStreamModeCurrentArgs = {
  channelId: Scalars['String'];
};


export type MutationMakeWaitlistYoutubeModeCurrentArgs = {
  channelId: Scalars['String'];
};


export type MutationSetUserLocaleArgs = {
  locale: Locale;
};


export type MutationSpotifyModeQueueAddTrackArgs = {
  channelId: Scalars['String'];
  trackId: Scalars['String'];
};


export type MutationSpotifyModeQueueSkipTrackArgs = {
  channelId: Scalars['String'];
};


export type MutationSpotifyModeUserSyncArgs = {
  channelId: Scalars['String'];
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
  channel?: InputMaybe<Scalars['String']>;
  community?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateEmojiAliasArgs = {
  alias: Scalars['String'];
  emojiId: Scalars['String'];
};


export type MutationUpdateSpotifyModeArgs = {
  input: UpdateSpotifyModeInput;
};


export type MutationUpdateTwitchStreamArgs = {
  input: UpdateTwitchStreamInput;
};


export type MutationWaitlistYoutubeQueueAddVideoArgs = {
  channelId: Scalars['String'];
  videoId: Scalars['String'];
};


export type MutationWaitlistYoutubeQueueSkipVideoArgs = {
  channelId: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  avatar?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
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
  spotifyToken: Scalars['String'];
  twitchStream: TwitchStream;
  uniqCount: Scalars['Int'];
  user?: Maybe<User>;
  waitlistYoutubeCurrent?: Maybe<YoutubeModeCurrent>;
  waitlistYoutubeHistory: YoutubeModeHistory;
  waitlistYoutubeQueue: YoutubeModeQueue;
};


export type QueryChannelArgs = {
  communityId: Scalars['String'];
  name: Scalars['String'];
};


export type QueryChannelMessagesArgs = {
  channelId: Scalars['ID'];
};


export type QueryChannelUsersOnlineArgs = {
  channelId: Scalars['String'];
};


export type QueryChannelsArgs = {
  name: Scalars['String'];
};


export type QueryCommunityArgs = {
  name: Scalars['String'];
};


export type QueryCommunitySettingsArgs = {
  name: Scalars['String'];
};


export type QueryEmojiArgs = {
  emojiId: Scalars['String'];
};


export type QueryEmojisArgs = {
  communityId: Scalars['String'];
};


export type QuerySpotifyModeArgs = {
  channelId: Scalars['String'];
};


export type QuerySpotifyModeCurrentArgs = {
  channelId: Scalars['String'];
};


export type QuerySpotifyModeHistoryArgs = {
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


export type QueryUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryWaitlistYoutubeCurrentArgs = {
  channelId: Scalars['String'];
};


export type QueryWaitlistYoutubeHistoryArgs = {
  channelId: Scalars['String'];
};


export type QueryWaitlistYoutubeQueueArgs = {
  channelId: Scalars['String'];
};

export type SpotifyMode = {
  __typename?: 'SpotifyMode';
  hostId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
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
  artists: Scalars['String'];
  author: SpotifyModeCurrentItemAuthor;
  cover: Scalars['String'];
  duration: Scalars['Int'];
  end: Scalars['Int'];
  id: Scalars['String'];
  start: Scalars['Int'];
  startedAt?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  trackId: Scalars['String'];
};

export type SpotifyModeCurrentItemAuthor = {
  __typename?: 'SpotifyModeCurrentItemAuthor';
  avatar?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
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
  artists: Scalars['String'];
  author: SpotifyModeHistoryItemDataAuthor;
  cover: Scalars['String'];
  duration: Scalars['Int'];
  endedAt?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  startedAt?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  trackId: Scalars['String'];
};

export type SpotifyModeHistoryItemDataAuthor = {
  __typename?: 'SpotifyModeHistoryItemDataAuthor';
  avatar?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
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
  artists: Scalars['String'];
  author: SpotifyModeQueueItemDataAuthor;
  cover: Scalars['String'];
  duration: Scalars['Int'];
  id: Scalars['String'];
  title: Scalars['String'];
  trackId: Scalars['String'];
};

export type SpotifyModeQueueItemDataAuthor = {
  __typename?: 'SpotifyModeQueueItemDataAuthor';
  avatar?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
};

export enum SpotifyModeStrategy {
  Host = 'HOST',
  Queue = 'QUEUE'
}

export type SpotifyNow = {
  __typename?: 'SpotifyNow';
  artist: Scalars['String'];
  id: Scalars['String'];
  imageUrl: Scalars['String'];
  name: Scalars['String'];
  progress: Scalars['Float'];
};

export type Subscription = {
  __typename?: 'Subscription';
  channelMessageCreated: ChannelMessage;
  channelMessageDeleted: ChannelMessage;
  spotifyModeCurrentUpdated: Scalars['Boolean'];
  spotifyModeHistoryUpdated: Scalars['Boolean'];
  spotifyModeQueueUpdated: Scalars['Boolean'];
  waitlistYoutubeCurrentUpdated: Scalars['Boolean'];
  waitlistYoutubeHistoryUpdated: Scalars['Boolean'];
  waitlistYoutubeQueueUpdated: Scalars['Boolean'];
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


export type SubscriptionSpotifyModeHistoryUpdatedArgs = {
  channelId: Scalars['String'];
};


export type SubscriptionSpotifyModeQueueUpdatedArgs = {
  channelId: Scalars['String'];
};


export type SubscriptionWaitlistYoutubeCurrentUpdatedArgs = {
  channelId: Scalars['String'];
};


export type SubscriptionWaitlistYoutubeHistoryUpdatedArgs = {
  channelId: Scalars['String'];
};


export type SubscriptionWaitlistYoutubeQueueUpdatedArgs = {
  channelId: Scalars['String'];
};

export type TenorGif = {
  __typename?: 'TenorGif';
  height: Scalars['Float'];
  id: Scalars['String'];
  preview: Scalars['String'];
  video: Scalars['String'];
  width: Scalars['Float'];
};

export type TwitchStream = {
  __typename?: 'TwitchStream';
  channelKey?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};

export type UpdateChannelInput = {
  channelId: Scalars['ID'];
  communityId: Scalars['ID'];
  gifAllowed?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  nsfw?: InputMaybe<Scalars['Boolean']>;
  slowmode?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateChannelSettingsInput = {
  channelId: Scalars['ID'];
  communityId: Scalars['ID'];
  gifAllowed?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  nsfw?: InputMaybe<Scalars['Boolean']>;
  slowmode?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateCommunityInput = {
  communityId: Scalars['ID'];
  name: Scalars['String'];
  title: Scalars['String'];
};

export type UpdateCommunitySettingsInput = {
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
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  locale: Locale;
  name?: Maybe<Scalars['String']>;
  profiles?: Maybe<Array<Profile>>;
  updatedAt: Scalars['DateTime'];
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
  artists: Scalars['String'];
  author: YoutubeModeCurrentItemAuthor;
  cover: Scalars['String'];
  duration: Scalars['Int'];
  id: Scalars['String'];
  startedAt?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  videoId: Scalars['String'];
};

export type YoutubeModeCurrentItemAuthor = {
  __typename?: 'YoutubeModeCurrentItemAuthor';
  avatar?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
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
  artists: Scalars['String'];
  author: YoutubeModeHistoryItemDataAuthor;
  cover: Scalars['String'];
  duration: Scalars['Int'];
  endedAt?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  startedAt?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  videoId: Scalars['String'];
};

export type YoutubeModeHistoryItemDataAuthor = {
  __typename?: 'YoutubeModeHistoryItemDataAuthor';
  avatar?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
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
  artists: Scalars['String'];
  author: YoutubeModeQueueItemDataAuthor;
  cover: Scalars['String'];
  duration: Scalars['Int'];
  id: Scalars['String'];
  title: Scalars['String'];
  videoId: Scalars['String'];
};

export type YoutubeModeQueueItemDataAuthor = {
  __typename?: 'YoutubeModeQueueItemDataAuthor';
  avatar?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
};
