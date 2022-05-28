import { FC } from 'react';
import { useRouter } from 'next/router';
import { ClipsView } from './View';
import { useClipsQuery } from '@dream/pepega/clip/ui';

interface ClipsProps {
  title?: string;
  description?: string;
}

export const Clips: FC<ClipsProps> = ({ title, description }) => {
  const router = useRouter();

  const { loading, error, data, fetchMore } = useClipsQuery({
    fetchPolicy: 'cache-and-network',
    ssr: false,
  });

  if (error || !data || !data.clips) {
    return null;
  }

  let clips = data.clips;
  const currentCount = clips.length;

  if (currentCount === 0) return null;

  const hasMore = false; //data.clips.count - currentCount > 0;

  return (
    <div className="flex flex-col w-full px-5">
      <ClipsView
        title={title}
        description={description}
        clips={clips}
        loading={loading}
        hasMore={hasMore}
        onPlay={(clipId) =>
          router.push(
            {
              pathname: router.route,
              query: {
                clipId,
                ...router.query,
              },
            },
            `/clip/${clipId}`
          )
        }
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
    </div>
  );
};
