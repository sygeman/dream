import gql from 'graphql-tag';
import { FC } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { ClipsView } from './View';

export const GET_CLIPS = gql`
  query clips(
    $orderBy: ClipOrderByInput
    $startedAt: String
    $ratingMin: Int
    $likedUserId: String
    $communityId: String
    $communityClipAuthorId: String
    $historyUserId: String
    $limit: Int
    $offset: Int
  ) {
    clips(
      orderBy: $orderBy
      startedAt: $startedAt
      ratingMin: $ratingMin
      likedUserId: $likedUserId
      communityId: $communityId
      communityClipAuthorId: $communityClipAuthorId
      historyUserId: $historyUserId
      limit: $limit
      offset: $offset
    ) {
      count
      clips {
        id
        title
        channel {
          name
        }
        thumbnail_url
        created_at
        reactionStats {
          rating
        }
        watched
      }
    }
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

interface IProps {
  orderBy?: any;
  startedAt?: string;
  ratingMin?: number;
  likedUserId?: string;
  communityId?: string;
  communityClipAuthorId?: string;
  historyUserId?: string;
  title?: string;
  description?: string;
  rows?: number;
  limit?: number;
  noMore?: boolean;
  titleLink?: string;
}

export const Clips: FC<IProps> = ({
  orderBy,
  startedAt,
  ratingMin,
  likedUserId,
  communityId,
  communityClipAuthorId,
  historyUserId,
  title,
  description,
  noMore,
  rows,
  titleLink,
}) => {
  const limit: number = 25;
  const router = useRouter();

  let variables: any = {
    orderBy,
    startedAt,
    ratingMin,
    likedUserId,
    communityId,
    communityClipAuthorId,
    historyUserId,
    offset: 0,
    limit: rows ? rows * 6 : limit,
  };

  const { loading, error, data, fetchMore } = useQuery(GET_CLIPS, {
    fetchPolicy: 'cache-and-network',
    ssr: false,
    variables,
  });

  if (error || !data || !data.clips) {
    return null;
  }

  let clips = data.clips.clips;

  if (typeof rows === 'number' && rows > 0) {
    clips = clips.slice(0, rows * 6);
  }

  const currentCount = clips.length;

  if (currentCount === 0) {
    return null;
  }

  const hasMore = data.clips.count - currentCount > 0;

  return (
    <Box style={{ padding: '0 20px' }}>
      <ClipsView
        title={title}
        description={description}
        titleLink={titleLink}
        clips={clips}
        loading={loading}
        rows={rows}
        hasMore={hasMore && !rows && !noMore}
        onPlay={(clipId) => {
          router.push(
            {
              pathname: router.route,
              query: {
                clipId,
                backPath: router.asPath,
                ...router.query,
              },
            },
            `/clip?id=${clipId}`,
            { shallow: true }
          );
        }}
        loadMore={() =>
          fetchMore({
            variables: {
              offset: currentCount,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return prev;
              }

              return {
                ...prev,
                clips: {
                  ...prev.clips,
                  clips: [...prev.clips.clips, ...fetchMoreResult.clips.clips],
                },
              };
            },
          })
        }
      />
    </Box>
  );
};
