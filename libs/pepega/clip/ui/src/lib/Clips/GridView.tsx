import { FC, memo } from 'react';
import { VideoPreview } from '@dream/pepega/components/video-preview';
import { CardMedia } from '@dream/pepega/components/card-media';
import { isEqual } from 'lodash';
import { dateDistanceInWordsToNow } from './date-distance-in-words-to-now';
import { Clip } from '@dream/pepega/types';

interface IProps {
  clip: Clip;
  onPlay: () => void;
}

export const GridView: FC<IProps> = memo(
  ({ clip, onPlay }) => {
    const date =
      clip && clip.created_at && dateDistanceInWordsToNow(clip.created_at);

    return (
      <CardMedia
        media={
          <div className="absolute top-0 left-0 w-full h-full">
            {clip && (
              <VideoPreview
                onClick={() => onPlay()}
                cover={clip.thumbnail_url}
                date={date}
                watched={false}
              />
            )}
          </div>
        }
        title={clip?.title}
        count={clip?.score}
      />
    );
  },
  (prevProps, nextProps) => {
    return isEqual(prevProps.clip, nextProps.clip);
  }
);

export default GridView;
