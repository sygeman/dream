import gql from 'graphql-tag';
import { FC } from 'react';
import { Query } from 'react-apollo';

const GET_USER_TWITCH_FOLLOWS = gql`
  query twitchFollows($after: String, $first: Int) {
    twitchFollows(after: $after, first: $first) {
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
      if (error || !data || !data.twitchFollows) {
        return null;
      }

      const totalCount = data.twitchFollows.total;
      const currentCount = data.twitchFollows.data.length;
      const hasMore = totalCount - currentCount > 0;

      const hasLess =
        !hasMore && totalCount > FIRST_SIZE && currentCount > FIRST_SIZE;

      return children({
        follows: data.twitchFollows.data,
        total: data.twitchFollows.total,
        hasMore,
        hasLess,
        loading,
        refetch,
        moreFollows: () => {
          fetchMore({
            variables: {
              after: data.twitchFollows.pagination.cursor,
              first: PAGE_SIZE
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return prev;
              }

              return {
                twitchFollows: {
                  ...fetchMoreResult.twitchFollows,
                  data: [
                    ...prev.twitchFollows.data,
                    ...fetchMoreResult.twitchFollows.data
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
