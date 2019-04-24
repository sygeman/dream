import gql from 'graphql-tag';
import { Component, FC } from 'react';
import { Query } from 'react-apollo';

const GET_USER = gql`
	query getUser($id: ID) {
		user(id: $id) {
			id
			name
			avatar
		}
	}
`;

interface IPropsInner {
	user: any;
	children: any;
}

class UserProviderInner extends Component<IPropsInner> {
	public render() {
		return this.props.children({
			user: this.props.user
		});
	}
}

interface IProps {
	id?: string;
}

const UserProvider: FC<IProps> = ({ children, id }) => (
	<Query query={GET_USER} variables={{ id }}>
		{({ loading, error, data }) => {
			if (loading) {
				return null;
			}

			if (error) {
				return null;
			}

			return <UserProviderInner user={data.user}>{children}</UserProviderInner>;
		}}
	</Query>
);

export default UserProvider;
