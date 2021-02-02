import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class ProfileVisibleChanged {
	@Field((type) => ID)
	id: string;

	@Field((type) => Boolean)
	visible: boolean;
}
