import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Profile {
	@Field((type) => ID)
	id: string;

	@Field((type) => ID)
	userId: string;

	@Field() name: string;

	@Field() avatar: string;

	@Field() serviceName: string;

	@Field() serviceId: string;

	@Field() visible: boolean;

	@Field() createdAt: Date;

	@Field() updatedAt: Date;
}
