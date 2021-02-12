import gql from 'graphql-tag';
import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { Button } from '@dream/pepega-ui';
import { useRouter } from 'next/router';
import { useAccess } from '@dream/utils/useAccess';
import * as LeftMenu from '@dream/pepega-ui/LeftMenu';
import styled from 'styled-components';
import {
  Favorite,
  KeyboardArrowDown as ArrowDownIcon,
  KeyboardArrowUp as ArrowUpIcon,
} from 'styled-icons/material';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

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

const FollowsGuest = styled.div`
  font-size: 13px;
  text-align: center;
  padding: 10px 20px;
  color: ${({ theme }) => theme.colors.accent};
`;

const FollowsGuestText = styled.div`
  padding: 5px 0;
`;

const FollowsGuestAction = styled.div`
  margin: 10px 0;
`;

const FIRST_SIZE = 10;
const PAGE_SIZE = 50;

const FollowsSkeleton = () => {
  return (
    <>
      <LeftMenu.SubItemSkeleton width={70} />
      <LeftMenu.SubItemSkeleton width={40} />
      <LeftMenu.SubItemSkeleton width={50} />
      <LeftMenu.SubItemSkeleton width={80} />
      <LeftMenu.SubItemSkeleton width={60} />
      <LeftMenu.SubItemSkeleton width={90} />
      <LeftMenu.SubItemSkeleton width={40} />
    </>
  );
};

const FollowsInner = () => {
  const router = useRouter();

  const { loading, data, fetchMore, refetch } = useQuery(
    GET_USER_TWITCH_FOLLOWS,
    {
      variables: { first: FIRST_SIZE, after: undefined },
    }
  );

  let follows = [];
  let total = 0;
  let currentCount = 0;
  let hasMore = false;
  let hasLess = false;
  const hasData = !!(data && data.twitchFollows);

  if (hasData) {
    follows = data.twitchFollows.data;
    total = data.twitchFollows.total;
    currentCount = data.twitchFollows.data.length;
    hasMore = total - currentCount > 0;
    hasLess = !hasMore && total > FIRST_SIZE && currentCount > FIRST_SIZE;
  }

  const moreFollows = () => {
    fetchMore({
      variables: {
        after: data.twitchFollows.pagination.cursor,
        first: PAGE_SIZE,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }

        return {
          twitchFollows: {
            //@ts-ignore
            ...fetchMoreResult.twitchFollows,
            data: [
              //@ts-ignore
              ...prev.twitchFollows.data,
              //@ts-ignore
              ...fetchMoreResult.twitchFollows.data,
            ],
          },
        };
      },
    });
  };

  return (
    <LeftMenu.Item
      route="/channel"
      icon={<Favorite size="18px" />}
      title="Подписки"
      badge={hasData && total}
      noClick
      showContentAlways
    >
      {follows.map((channel: any) => {
        if (!channel) {
          return null;
        }

        return (
          <LeftMenu.SubItem
            route={`/channel?id=${channel.to_id}`}
            active={
              router.route === '/channel' && router.query.id === channel.to_id
            }
            key={channel.to_id}
          >
            {channel.to_name}
          </LeftMenu.SubItem>
        );
      })}
      {loading && <FollowsSkeleton />}
      {hasMore && (
        <LeftMenu.LoadMore onClick={() => moreFollows()}>
          {loading ? 'Загрузка...' : <ArrowDownIcon size="20px" />}
        </LeftMenu.LoadMore>
      )}
      {hasLess && (
        <LeftMenu.LoadMore onClick={() => refetch()}>
          <ArrowUpIcon size="20px" />
        </LeftMenu.LoadMore>
      )}
    </LeftMenu.Item>
  );
};

export const Follows: FC = () => {
  const [{ allow: isUser, loading }] = useAccess();
  const router = useRouter();

  console.log(router);

  if (loading) {
    return (
      <LeftMenu.Item
        route="/channel"
        icon={<Favorite size="18px" />}
        title="Подписки"
        noClick
        showContentAlways
      >
        <FollowsSkeleton />
      </LeftMenu.Item>
    );
  }

  if (!isUser) {
    return (
      <LeftMenu.Item
        route="/channel"
        icon={<Favorite size="18px" />}
        title="Подписки"
        noClick
        showContentAlways
      >
        <FollowsGuest>
          <FollowsGuestText>
            Войдите через Twitch чтобы видеть список своих подписок
          </FollowsGuestText>
          <FollowsGuestAction>
            <a href="https://api.sgmn.dev/auth/twitch">
              <Button>Войти</Button>
            </a>
          </FollowsGuestAction>
        </FollowsGuest>
      </LeftMenu.Item>
    );
  }

  return <FollowsInner />;
};
