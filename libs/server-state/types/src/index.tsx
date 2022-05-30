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

export type Mutation = {
  __typename?: 'Mutation';
  incrementCount: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  updateConnectionStatus: Scalars['Boolean'];
};


export type MutationIncrementCountArgs = {
  projectId: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  avatar?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  alias?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  id: Scalars['String'];
  stateId?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ProjectState = {
  __typename?: 'ProjectState';
  count: Scalars['Float'];
  createdAt: Scalars['String'];
  id: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me: User;
  project: Project;
  projectState: ProjectState;
  user?: Maybe<User>;
};


export type QueryProjectArgs = {
  id: Scalars['String'];
};


export type QueryProjectStateArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  projectStateUpdated: Scalars['String'];
};


export type SubscriptionProjectStateUpdatedArgs = {
  projectId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  profiles?: Maybe<Array<Profile>>;
  updatedAt: Scalars['DateTime'];
};
