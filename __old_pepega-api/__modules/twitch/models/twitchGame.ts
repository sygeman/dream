import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class TwitchGame {
	@Field() id: string;

	@Field() name: string;

	@Field() box_art_url: string;
}
