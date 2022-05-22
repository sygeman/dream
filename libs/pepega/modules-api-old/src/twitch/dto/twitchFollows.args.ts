import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class TwitchFollowsArgs {
	@Field((type) => Int, { nullable: true })
	offset?: number;

	@Field((type) => Int, { nullable: true })
	limit?: number;
}
