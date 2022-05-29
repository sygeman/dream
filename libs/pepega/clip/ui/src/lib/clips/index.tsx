import { dateDistanceInWordsToNow } from './date-distance-in-words-to-now';
import { CardMedia } from '@dream/pepega/components/card-media';
import { VideoPreview } from '@dream/pepega/components/video-preview';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { VirtuosoGrid } from 'react-virtuoso';
import { useClipsQuery } from '../clip.api';
import { Scroller } from './scrollbar';

export const Clips = () => {
  const maxOnRow = 6;
  const elementWidth = 320;

  const router = useRouter();
  const { width, ref } = useResizeDetector({
    skipOnMount: true,
    handleHeight: false,
  });
  const [innerWidth, setInnerWidth] = useState(0);

  const { data } = useClipsQuery({
    fetchPolicy: 'cache-and-network',
    ssr: false,
  });

  useEffect(() => {
    const containerWidth = width || 0;
    let countOnRow = Math.floor(containerWidth / elementWidth);

    if (countOnRow < 1) {
      countOnRow = 1;
    } else if (countOnRow > maxOnRow) {
      countOnRow = maxOnRow;
    }

    let gridWidth = countOnRow * elementWidth;

    if (gridWidth < elementWidth) {
      gridWidth = elementWidth;
    }

    setInnerWidth(gridWidth);
  }, [width, maxOnRow, elementWidth]);

  const clips = data?.clips || [];
  const currentCount = clips.length;

  const getClipByIndex = (index: number) => {
    const clip = clips[index];

    if (!clip) {
      return (
        <div className="m-2">
          <CardMedia title="" />
        </div>
      );
    }

    const date =
      clip && clip.created_at && dateDistanceInWordsToNow(clip.created_at);

    return (
      <div className="m-2">
        <CardMedia
          media={
            <div className="absolute top-0 left-0 w-full h-full">
              {clip && (
                <VideoPreview
                  onClick={() =>
                    router.push(
                      {
                        pathname: router.route,
                        query: {
                          clipId: clip.id,
                          ...router.query,
                        },
                      },
                      `/clip/${clip.id}`
                    )
                  }
                  cover={clip.thumbnail_url}
                  date={date}
                />
              )}
            </div>
          }
          title={clip?.title}
          count={clip?.score}
        />
      </div>
    );
  };

  return (
    <div ref={ref} className="w-full h-full py-4">
      <style>{`
        .virtuoso-grid-list {
          margin: 0 auto;
          width: ${innerWidth}px;
          display: grid;
          grid-template-columns: repeat(auto-fit, ${elementWidth}px);
        }
      `}</style>
      <VirtuosoGrid
        totalCount={currentCount}
        overscan={200}
        components={{
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          Scroller,
          ScrollSeekPlaceholder: ({ index }) => getClipByIndex(index),
        }}
        itemContent={(index) => getClipByIndex(index)}
      />
    </div>
  );
};
