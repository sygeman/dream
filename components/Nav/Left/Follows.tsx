import gql from 'graphql-tag';
import { FC } from 'react';
import { useQuery } from 'react-apollo';
import { Icon } from '../../../ui';
import { useRouter } from '../../../hooks/useRouter';
import * as LeftMenu from '../../../ui/LeftMenu';

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

const FIRST_SIZE = 10;
const PAGE_SIZE = 50;

export const Follows: FC = () => {
  const router = useRouter();

  const { loading, error, data, fetchMore, refetch } = useQuery(
    GET_USER_TWITCH_FOLLOWS,
    { variables: { first: FIRST_SIZE, after: undefined } }
  );

  if (error || !data || !data.twitchFollows) {
    return null;
  }

  const follows = data.twitchFollows.data;
  const total = data.twitchFollows.total;
  const currentCount = data.twitchFollows.data.length;
  const hasMore = total - currentCount > 0;

  const hasLess = !hasMore && total > FIRST_SIZE && currentCount > FIRST_SIZE;

  const moreFollows = () => {
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
  };

  return (
    <LeftMenu.Item
      route="/channel"
      icon="favorite"
      title="Подписки"
      badge={total}
      noClick
      showContentAlways
    >
      {follows.map(channel => (
        <LeftMenu.SubItem
          route={`/channel?id=${channel.to_id}`}
          active={
            router.route === '/channel' && router.query.id === channel.to_id
          }
          key={channel.to_id}
        >
          {channel.to_name}
        </LeftMenu.SubItem>
      ))}
      {hasMore && (
        <LeftMenu.LoadMore onClick={() => moreFollows()}>
          {loading ? 'Загрузка...' : <Icon type="chevron-down" />}
        </LeftMenu.LoadMore>
      )}
      {hasLess && (
        <LeftMenu.LoadMore onClick={() => refetch()}>
          <Icon type="chevron-up" />
        </LeftMenu.LoadMore>
      )}
    </LeftMenu.Item>
  );
};
