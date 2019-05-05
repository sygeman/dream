import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import ruLocale from 'date-fns/locale/ru';
import { FC, memo } from 'react';
import styled from 'styled-components';
import { VideoPreview } from '../../ui/VideoPreview';
import { IPost } from './interfaces/Post';
import { isEqual } from 'lodash';
import { CardMedia } from '../../ui/CardMedia';

const PreviewContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

interface IProps {
  post: IPost;
  onPlay: () => void;
}

export const GridView: FC<IProps> = memo(
  ({ post, onPlay }) => {
    const date =
      post &&
      post.createdAt &&
      distanceInWordsToNow(parseInt(post.createdAt, 10), {
        locale: ruLocale
      }) + ' назад';

    return (
      <CardMedia
        media={
          <PreviewContent>
            {post && (
              <VideoPreview
                onClick={() => onPlay()}
                nsfw={post.nfws}
                spoiler={post.spoiler}
                cover={post.cover}
                date={date}
              />
            )}
          </PreviewContent>
        }
        title={post && post.title}
        description={post.channelName}
        descriptionLink={`https://www.twitch.tv/${post.channelName}`}
        count={post ? post.rating : 0}
        countIcon={post && post.rating < 0 ? 'thumb-down' : 'thumb-up'}
      />
    );
  },
  (prevProps, nextProps) => {
    return isEqual(prevProps.post, nextProps.post);
  }
);

export default GridView;
