import gql from 'graphql-tag';
import { FC } from 'react';
import { Query } from 'react-apollo';

const GET_USER_TWITCH_FOLLOWS = gql`
  query($after: String, $first: Int, $id: String) {
    twitchFollowsFrom(after: $after, first: $first, id: $id) {
      total
      data {
        to_name
        to_id
      }
      pagination {
        cursor
      }
    }
  }
`;

interface IProps {
  children: any;
}

const FIRST_SIZE = 10;
const PAGE_SIZE = 50;

const Follows: FC<IProps> = ({ children }) => (
  <Query
    query={GET_USER_TWITCH_FOLLOWS}
    variables={{
      first: FIRST_SIZE
    }}
  >
    {({ loading, error, data, fetchMore, refetch }) => {
      if (error || !data || !data.twitchFollowsFrom) {
        return null;
      }

      const totalCount = data.twitchFollowsFrom.total;
      const currentCount = data.twitchFollowsFrom.data.length;
      const hasMore = totalCount - currentCount > 0;

      const hasLess =
        !hasMore && totalCount > FIRST_SIZE && currentCount > FIRST_SIZE;

      return children({
        follows: data.twitchFollowsFrom.data,
        total: data.twitchFollowsFrom.total,
        hasMore,
        hasLess,
        loading,
        refetch,
        moreFollows: () => {
          fetchMore({
            variables: {
              after: data.twitchFollowsFrom.pagination.cursor,
              first: PAGE_SIZE
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return prev;
              }

              return {
                twitchFollowsFrom: {
                  ...fetchMoreResult.twitchFollowsFrom,
                  data: [
                    ...prev.twitchFollowsFrom.data,
                    ...fetchMoreResult.twitchFollowsFrom.data
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

export default Follows;
