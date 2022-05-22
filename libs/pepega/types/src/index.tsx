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

export enum Locale {
  EnUs = 'en_US',
  RuRu = 'ru_RU'
}

export type Mutation = {
  __typename?: 'Mutation';
  logout: Scalars['Boolean'];
  setUserLocale: Locale;
  updateConnectionStatus: Scalars['Boolean'];
};


export type MutationSetUserLocaleArgs = {
  locale: Locale;
};


export type MutationUpdateConnectionStatusArgs = {
  channel?: InputMaybe<Scalars['String']>;
  community?: InputMaybe<Scalars['String']>;
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
  me: User;
  user?: Maybe<User>;
};


export type QueryUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
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
