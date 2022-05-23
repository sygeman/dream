import { FC, memo } from 'react';
import styled from 'styled-components';
import { VideoPreview, CardMedia } from '@dream/pepega/components-old';
import { isEqual } from 'lodash';
import { dateDistanceInWordsToNow } from '@dream/pepega/utils-old';
import { Clip } from '@dream/pepega/types';

const PreviewContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

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
          <PreviewContent>
            {clip && (
              <VideoPreview
                onClick={() => onPlay()}
                cover={clip.thumbnail_url}
                date={date}
                watched={false}
              />
            )}
          </PreviewContent>
        }
        title={clip?.title}
        descriptionLink={`https://www.twitch.tv/${clip?.channel?.name}`}
        count={clip?.score}
      />
    );
  },
  (prevProps, nextProps) => {
    return isEqual(prevProps.clip, nextProps.clip);
  }
);

export default GridView;
