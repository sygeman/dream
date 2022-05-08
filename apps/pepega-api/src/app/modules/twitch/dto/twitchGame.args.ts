import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class TwitchGameArgs {
	@Field({ nullable: true })
	id?: string;

	@Field({ nullable: true })
	name?: string;
}
