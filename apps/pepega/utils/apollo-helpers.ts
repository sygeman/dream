import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type ClipKeySpecifier = ('broadcaster_id' | 'createdAt' | 'created_at' | 'creator_id' | 'game_id' | 'id' | 'language' | 'score' | 'sourceUrl' | 'thumbnail_url' | 'title' | 'updatedAt' | 'video_id' | ClipKeySpecifier)[];
export type ClipFieldPolicy = {
	broadcaster_id?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	creator_id?: FieldPolicy<any> | FieldReadFunction<any>,
	game_id?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	language?: FieldPolicy<any> | FieldReadFunction<any>,
	score?: FieldPolicy<any> | FieldReadFunction<any>,
	sourceUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	thumbnail_url?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	video_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ClipCommentKeySpecifier = ('clipId' | 'content' | 'createdAt' | 'id' | 'updatedAt' | 'user' | 'userId' | ClipCommentKeySpecifier)[];
export type ClipCommentFieldPolicy = {
	clipId?: FieldPolicy<any> | FieldReadFunction<any>,
	content?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ClipCommentUserKeySpecifier = ('avatar' | 'id' | 'name' | 'role' | ClipCommentUserKeySpecifier)[];
export type ClipCommentUserFieldPolicy = {
	avatar?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	role?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ClipsKeySpecifier = ('clips' | 'cursor' | ClipsKeySpecifier)[];
export type ClipsFieldPolicy = {
	clips?: FieldPolicy<any> | FieldReadFunction<any>,
	cursor?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('createClipComment' | 'decreaseClipScore' | 'increaseClipScore' | 'logout' | 'removeClipComment' | 'setClipHistory' | 'setUserLocale' | 'updateConnectionStatus' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	createClipComment?: FieldPolicy<any> | FieldReadFunction<any>,
	decreaseClipScore?: FieldPolicy<any> | FieldReadFunction<any>,
	increaseClipScore?: FieldPolicy<any> | FieldReadFunction<any>,
	logout?: FieldPolicy<any> | FieldReadFunction<any>,
	removeClipComment?: FieldPolicy<any> | FieldReadFunction<any>,
	setClipHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	setUserLocale?: FieldPolicy<any> | FieldReadFunction<any>,
	updateConnectionStatus?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProfileKeySpecifier = ('avatar' | 'id' | 'name' | 'provider' | ProfileKeySpecifier)[];
export type ProfileFieldPolicy = {
	avatar?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	provider?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('clip' | 'clipComments' | 'clipScore' | 'clips' | 'follows' | 'me' | 'user' | 'userCoins' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	clip?: FieldPolicy<any> | FieldReadFunction<any>,
	clipComments?: FieldPolicy<any> | FieldReadFunction<any>,
	clipScore?: FieldPolicy<any> | FieldReadFunction<any>,
	clips?: FieldPolicy<any> | FieldReadFunction<any>,
	follows?: FieldPolicy<any> | FieldReadFunction<any>,
	me?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	userCoins?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubscriptionKeySpecifier = ('clipCommentCreated' | 'clipCommentRemoved' | 'clipScoreUpdated' | 'userCoinsUpdated' | SubscriptionKeySpecifier)[];
export type SubscriptionFieldPolicy = {
	clipCommentCreated?: FieldPolicy<any> | FieldReadFunction<any>,
	clipCommentRemoved?: FieldPolicy<any> | FieldReadFunction<any>,
	clipScoreUpdated?: FieldPolicy<any> | FieldReadFunction<any>,
	userCoinsUpdated?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TwitchChannelKeySpecifier = ('display_name' | 'id' | 'login' | 'profile_image_url' | TwitchChannelKeySpecifier)[];
export type TwitchChannelFieldPolicy = {
	display_name?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	login?: FieldPolicy<any> | FieldReadFunction<any>,
	profile_image_url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('avatar' | 'createdAt' | 'id' | 'locale' | 'name' | 'profiles' | 'role' | 'updatedAt' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	avatar?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	locale?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	profiles?: FieldPolicy<any> | FieldReadFunction<any>,
	role?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	Clip?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ClipKeySpecifier | (() => undefined | ClipKeySpecifier),
		fields?: ClipFieldPolicy,
	},
	ClipComment?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ClipCommentKeySpecifier | (() => undefined | ClipCommentKeySpecifier),
		fields?: ClipCommentFieldPolicy,
	},
	ClipCommentUser?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ClipCommentUserKeySpecifier | (() => undefined | ClipCommentUserKeySpecifier),
		fields?: ClipCommentUserFieldPolicy,
	},
	Clips?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ClipsKeySpecifier | (() => undefined | ClipsKeySpecifier),
		fields?: ClipsFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Profile?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProfileKeySpecifier | (() => undefined | ProfileKeySpecifier),
		fields?: ProfileFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Subscription?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubscriptionKeySpecifier | (() => undefined | SubscriptionKeySpecifier),
		fields?: SubscriptionFieldPolicy,
	},
	TwitchChannel?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TwitchChannelKeySpecifier | (() => undefined | TwitchChannelKeySpecifier),
		fields?: TwitchChannelFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;