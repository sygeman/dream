import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class TwitchStream {
	@Field() id: string;

	@Field() user_id: string;

	@Field() user_name: string;

	@Field() game_id: string;

	@Field((type) => [String])
	community_ids: string[];

	@Field() type: string;

	@Field() title: string;

	@Field((type) => Int)
	viewer_count: number;

	@Field() started_at: string;

	@Field() language: string;

	@Field() thumbnail_url: string;
}
