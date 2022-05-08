import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class TwitchClipThumbnails {
	@Field() medium: string;

	@Field() small: string;

	@Field() tiny: string;
}
