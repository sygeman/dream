import { FC, memo } from 'react';
import styled from 'styled-components';
import { VideoPreview, CardMedia } from '../../../ui';
import { isEqual } from 'lodash';
import { dateDistanceInWordsToNow } from '../../../utils/date';

const PreviewContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

// const PostDeleted = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   min-height: 200px;
//   color: ${({ theme }) => theme.accent2Color};
//   text-transform: uppercase;
//   font-size: 12px;

//   i {
//     font-size: 25px;
//     padding: 20px 0;
//   }
// `;

interface IProps {
  clip: any;
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
              />
            )}
          </PreviewContent>
        }
        title={clip && clip.title}
        description={clip.channel.name}
        descriptionLink={`https://www.twitch.tv/${clip.channel.name}`}
        count={clip ? clip.reactionStats.rating : 0}
        countIcon={
          clip && clip.reactionStats.rating < 0 ? 'thumb-down' : 'thumb-up'
        }
      />
    );
  },
  (prevProps, nextProps) => {
    return isEqual(prevProps.clip, nextProps.clip);
  }
);

export default GridView;
