import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class TwitchFollower {
	@Field() title: string;

	@Field() name: string;
}
