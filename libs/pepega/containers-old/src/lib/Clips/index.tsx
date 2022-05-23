import { FC } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { ClipsView } from './View';
import { useClipsQuery } from '@dream/pepega/clip/ui';

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
  const router = useRouter();

  const { loading, error, data, fetchMore } = useClipsQuery({
    fetchPolicy: 'cache-and-network',
    ssr: false,
  });

  if (error || !data || !data.clips) {
    return null;
  }

  let clips = data.clips;

  if (typeof rows === 'number' && rows > 0) {
    clips = clips.slice(0, rows * 6);
  }

  const currentCount = clips.length;

  if (currentCount === 0) {
    return null;
  }

  const hasMore = false; //data.clips.count - currentCount > 0;

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
        loadMore={
          async () => null
          // fetchMore({
          //   variables: {
          //     offset: currentCount,
          //   },
          //   updateQuery: (prev, { fetchMoreResult }) => {
          //     if (!fetchMoreResult) {
          //       return prev;
          //     }

          //     return {
          //       ...prev,
          //       clips: {
          //         ...prev.clips,
          //         clips: [...prev.clips.clips, ...fetchMoreResult.clips.clips],
          //       },
          //     };
          //   },
          // })
        }
      />
    </Box>
  );
};
