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

export type Clip = {
  __typename?: 'Clip';
  broadcaster_id: Scalars['String'];
  createdAt: Scalars['String'];
  created_at: Scalars['String'];
  creator_id: Scalars['String'];
  game_id: Scalars['String'];
  id: Scalars['String'];
  language: Scalars['String'];
  score: Scalars['Float'];
  sourceUrl: Scalars['String'];
  thumbnail_url: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  video_id: Scalars['String'];
};

export type ClipComment = {
  __typename?: 'ClipComment';
  clipId: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['String'];
  updatedAt: Scalars['String'];
  user: ClipCommentUser;
  userId: Scalars['String'];
};

export type ClipCommentCreateInput = {
  clipId: Scalars['String'];
  content: Scalars['String'];
};

export type ClipCommentUser = {
  __typename?: 'ClipCommentUser';
  avatar?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  role?: Maybe<UserRole>;
};

export enum Locale {
  EnUs = 'en_US',
  RuRu = 'ru_RU'
}

export type Mutation = {
  __typename?: 'Mutation';
  createClipComment: Scalars['Boolean'];
  decreaseClipScore: Scalars['Boolean'];
  increaseClipScore: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  removeClipComment: Scalars['Boolean'];
  setClipHistory: Scalars['Boolean'];
  setUserLocale: Locale;
  updateConnectionStatus: Scalars['Boolean'];
};


export type MutationCreateClipCommentArgs = {
  input: ClipCommentCreateInput;
};


export type MutationDecreaseClipScoreArgs = {
  clipId: Scalars['String'];
};


export type MutationIncreaseClipScoreArgs = {
  clipId: Scalars['String'];
};


export type MutationRemoveClipCommentArgs = {
  id: Scalars['ID'];
};


export type MutationSetClipHistoryArgs = {
  clipId: Scalars['String'];
};


export type MutationSetUserLocaleArgs = {
  locale: Locale;
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
  clip?: Maybe<Clip>;
  clipComments: Array<ClipComment>;
  clipScore: Scalars['Int'];
  clips?: Maybe<Array<Clip>>;
  me: User;
  user?: Maybe<User>;
  userCoins: Scalars['Int'];
};


export type QueryClipArgs = {
  id: Scalars['String'];
};


export type QueryClipCommentsArgs = {
  clipId: Scalars['ID'];
};


export type QueryClipScoreArgs = {
  clipId: Scalars['String'];
};


export type QueryUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  clipCommentCreated: ClipComment;
  clipCommentRemoved: Scalars['ID'];
  clipScoreUpdated: Scalars['Int'];
  userCoinsUpdated: Scalars['Int'];
};


export type SubscriptionClipCommentCreatedArgs = {
  clipId: Scalars['ID'];
};


export type SubscriptionClipCommentRemovedArgs = {
  clipId: Scalars['ID'];
};


export type SubscriptionClipScoreUpdatedArgs = {
  clipId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  locale: Locale;
  name?: Maybe<Scalars['String']>;
  profiles?: Maybe<Array<Profile>>;
  role?: Maybe<UserRole>;
  updatedAt: Scalars['DateTime'];
};

export enum UserRole {
  Admin = 'Admin',
  Mod = 'Mod',
  User = 'User'
}
