import gql from 'graphql-tag';
import { Component } from 'react';
import { Query } from 'react-apollo';

const GET_USER_TWITCH_FOLLOWS = gql`
	query twitchFollows($limit: Int, $offset: Int) {
		twitchFollows(offset: $offset, limit: $limit) {
			count
			follows {
				title
				name
			}
		}
	}
`;

interface IProps {
	children: any;
}

class Follows extends Component<IProps> {
	public page: number;
	public pageSize: number;

	constructor(props) {
		super(props);

		this.page = 1;
		this.pageSize = 50;
	}

	public render() {
		const { children } = this.props;

		return (
			<Query
				query={GET_USER_TWITCH_FOLLOWS}
				variables={{
					limit: this.pageSize,
					offset: 0
				}}
			>
				{({ loading, error, data, fetchMore }) => {
					if (loading) {
						return null;
					}

					if (error || !data || !data.twitchFollows) {
						return null;
					}

					return children({
						follows: data.twitchFollows.follows,
						hasMore: this.page * this.pageSize <= data.twitchFollows.count,
						moreFollows: () => {
							fetchMore({
								variables: {
									offset: this.page * this.pageSize
								},
								updateQuery: (prev, { fetchMoreResult }) => {
									if (!fetchMoreResult) {
										return prev;
									}

									this.page++;

									return {
										...prev,
										twitchFollows: {
											...prev.twitchFollows,
											follows: [
												...prev.twitchFollows.follows,
												...fetchMoreResult.twitchFollows.follows
											]
										}
									};
								}
							});
						}
					});
				}}
			</Query>
		);
	}
}

export default Follows;
